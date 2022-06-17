package com.example.gmaoapp.controllers.otControllers;


import com.example.gmaoapp.models.forms.OtForm;
import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.ot.OTReclamationChambre;
import com.example.gmaoapp.models.ot.OTReclamtionEquipement;
import com.example.gmaoapp.services.ExportOtService;
import com.example.gmaoapp.services.otService.OTService;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.List;

import com.itextpdf.tool.xml.XMLWorkerHelper;


@RestController
@RequestMapping("/Ot")
public class OtController {

    @Autowired
    OTService otService;

    @Autowired
    ExportOtService exportotService;

    StringReader htmlDoc=null;

    @Autowired
    SpringTemplateEngine templateEngine;


    @GetMapping("/tous")
    public ResponseEntity<List<OT>> chargerTous(){
        List<OT> ot=otService.chargerTous();
        return new ResponseEntity<>(ot, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<OT>> getActive(){
        List<OT> ot=otService.getActive();
        return new ResponseEntity<>(ot, HttpStatus.OK);
    }


    @PutMapping("/ot/activate/{id}")
    public ResponseEntity<?> ActivateOT(@PathVariable("id") Long id){
        return new ResponseEntity<>(otService.enableOt(id),HttpStatus.OK);
    }

    @PutMapping("/ot/desactivate/{id}")
    public ResponseEntity<?> DesactivateOT(@PathVariable("id") Long id){
        return new ResponseEntity<>(otService.disableOt(id),HttpStatus.OK);
    }



    @GetMapping("/chercherParId/{id}")
    public ResponseEntity<OT>chercherotParId(@PathVariable("id")long id){
        OT ot=otService.chercherOtParId(id);
        return new ResponseEntity<>(ot,HttpStatus.OK);

    }

    @GetMapping("/enCours")
    public ResponseEntity<List<OT>> chargerEnCours(){
        List<OT> ot=otService.chargerEnCours();
        return new ResponseEntity<>(ot, HttpStatus.OK);
    }

    @GetMapping("/count_en_cours")
    public ResponseEntity<Long> count_intervention_en_cours(){
        return new ResponseEntity<>(otService.count_ots_en_cours(),HttpStatus.OK);
    }



    /*@PostMapping("/modifier")
    public ResponseEntity<OTReclamtionEquipement> modifierPieces(@RequestBody otFormModifier otFormModifier){
        OTReclamtionEquipement ot1=otEquipementService.modifierot(otFormModifier);
        return new ResponseEntity<>(ot1,HttpStatus.OK);

    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerPieces(@PathVariable("id") Long id){
        otEquipementService.supprimer(id);
        return ResponseEntity.ok(HttpStatus.OK);

    }*/




    @PostMapping ("/ajouter")
    public ResponseEntity<OT> ajouterot(@RequestBody OtForm otForm){
        return new ResponseEntity<>(otService.ajouterOt(otForm),HttpStatus.OK);
    }

    /*@GetMapping("/export/pdf")
    public ResponseEntity<?> exportPdf(*//*@PathVariable("id") Long id*//*){
        //OT ot=otService.chercherotParId(id);
        exportotService.otPDF();
        HttpHeaders headers=new HttpHeaders();
        headers.add("Content-Disposition","inline;filename=ots.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).build();
    }*/



    @PostMapping("/getPdf/{id}")
    public ResponseEntity<ByteArrayResource> getPdf(@PathVariable("id") Long id ) throws IOException, DocumentException {
        Context context = new Context();
        OT ot=otService.chercherOtParId(id);
        System.out.println(ot);
        com.itextpdf.text.Document doc=new Document(PageSize.A4);
        context.setVariable("numero",ot.getId());
        context.setVariable("type",ot.getType());
        context.setVariable("description",ot.getDescription());
        context.setVariable("intervenants",ot.getIntervenantsAffectes());
        if(ot instanceof OTReclamationChambre){
            context.setVariable("OtPannes",(OTReclamationChambre) ot);
        }
        if(ot instanceof OTReclamtionEquipement){
            context.setVariable("OtEquipements",(OTReclamtionEquipement) ot);
        }

        String htmlContentToRender = templateEngine.process("pdf-template", context);
        String xHtml = null;
        xHtml = otService.xhtmlConvert(htmlContentToRender);
        //Below steps are to store the pdf inside spring boot
//
//        ITextRenderer renderer = new ITextRenderer();
//
//        String baseUrl = FileSystems
//                .getDefault()
//                .getPath("src", "main", "resources","templates")
//                .toUri()
//                .toURL()
//                .toString();
//        renderer.setDocumentFromString(xHtml, baseUrl);
//        renderer.layout();
//
//        OutputStream outputStream = new FileOutputStream("src//test.pdf");
//        renderer.createPDF(outputStream);
//        outputStream.close();
//
//        return ot;




        //Do the below steps in a service call this is to send to angular
        htmlDoc=new StringReader(xHtml);
        ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
        PdfWriter pdfWriter=PdfWriter.getInstance(doc,outputStream);
        doc.open();
        XMLWorkerHelper.getInstance().parseXHtml(pdfWriter,doc,htmlDoc);
        doc.close();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/pdf"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "Downloads.pdf" + "\"")
                .body(new ByteArrayResource(outputStream.toByteArray()));

    }

}
