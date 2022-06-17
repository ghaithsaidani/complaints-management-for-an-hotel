package com.example.gmaoapp.services;


import com.example.gmaoapp.models.ot.OT;
import com.example.gmaoapp.models.ot.OTReclamationChambre;
import com.example.gmaoapp.models.ot.OTReclamtionEquipement;
import com.example.gmaoapp.repository.otRepository.OTRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class ExportOtService {
    @Autowired
    private OTRepository otRepository;
    /*public void OtPDF(*//*OT Ot*//*){
        Document document=  new Document();
        *//*String paragraphText;
        String listIntervenants="";
        String listReclamations="";*//*
        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document,byteArrayOutputStream);
            document.open();
            com.itextpdf.text.Font font= FontFactory.getFont(FontFactory.COURIER,14, BaseColor.BLACK);
            *//*for(int i=0;i<Ot.getIntervenantsAffectes().size();i++){
                listIntervenants=listIntervenants+"\nNom Intervenant : "+(i+1)+" : "+Ot.getIntervenantsAffectes().get(i).getNom()+
                        " "+Ot.getIntervenantsAffectes().get(i).getPrenom()+"\nProfession Intervenant : "+Ot.getIntervenantsAffectes().get(i).getProfession();
            }
            paragraphText="Type de l'ordre de Travail : "+Ot.getType()+";\nDate Lancement : "+Ot.getDateLancement()+"\nList Intervenants : "+listIntervenants;

            if(Ot instanceof OTReclamationChambre){
                for(int i=0;i<((OTReclamationChambre) Ot).getReclamationsPannes().size();i++){
                    listReclamations=listReclamations+"Type de Panne "+(i+1)+" : "+((OTReclamationChambre) Ot).getReclamationsPannes().get(i).getReclamation().getTypePanne().getDesignation();
                }

            }
            else if(Ot instanceof OTReclamtionEquipement){
                for(int i=0;i<((OTReclamtionEquipement) Ot).getReclamationsEquipement().size();i++){
                    listReclamations=listReclamations+"Equipement "+(i+1)+" : "+((OTReclamtionEquipement) Ot).getReclamationsEquipement().get(i).getReclamation().getEquipement().getDesignation();
                }
            }
            paragraphText=paragraphText+"\nList Reclamations : \n"+listReclamations;*//*
            Paragraph paragraph=new Paragraph("hello world");
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);
            document.add(Chunk.NEWLINE);

        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }*/


    public void export(HttpServletResponse response,Long id) throws IOException {
        Document document=new Document(PageSize.A5);
        PdfWriter.getInstance(document,response.getOutputStream());
        document.open();
        OT Ot=otRepository.findById(id).get();
        String paragraphText;
        String listIntervenants="";
        String listReclamations="";
        for(int i=0;i<Ot.getIntervenantsAffectes().size();i++){
            listIntervenants=listIntervenants+"\nNom Intervenant : "+(i+1)+" : "+Ot.getIntervenantsAffectes().get(i).getNom()+
                    " "+Ot.getIntervenantsAffectes().get(i).getPrenom()+"\nProfession Intervenant : "+Ot.getIntervenantsAffectes().get(i).getProfession();
        }
        paragraphText="Type de l'ordre de Travail : "+Ot.getType()+";\nDate Lancement : "+Ot.getDateLancement()+"\nList Intervenants : "+listIntervenants;

        if(Ot instanceof OTReclamationChambre){
            for(int i=0;i<((OTReclamationChambre) Ot).getReclamationsPannes().size();i++){
                listReclamations=listReclamations+"Type de Panne "+(i+1)+" : "+((OTReclamationChambre) Ot).getReclamationsPannes().get(i).getReclamation().getTypePanne().getDesignation();
            }

        }
        else if(Ot instanceof OTReclamtionEquipement){
            for(int i=0;i<((OTReclamtionEquipement) Ot).getReclamationsEquipement().size();i++){
                listReclamations=listReclamations+"Equipement "+(i+1)+" : "+((OTReclamtionEquipement) Ot).getReclamationsEquipement().get(i).getReclamation().getEquipement().getDesignation();
            }
        }
        paragraphText=paragraphText+"\nList Reclamations : \n"+listReclamations;
        /*Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        Paragraph paragraph = new Paragraph("",fontTitle);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);*/

        Font fontparagraph=FontFactory.getFont(FontFactory.HELVETICA);
        fontparagraph.setSize(12);
        Paragraph paragraph = new Paragraph(paragraphText,fontparagraph);
        paragraph.setAlignment(Paragraph.ALIGN_LEFT);

        document.add(paragraph);
        //document.add(paragraph2);
        document.close();

    }


}
