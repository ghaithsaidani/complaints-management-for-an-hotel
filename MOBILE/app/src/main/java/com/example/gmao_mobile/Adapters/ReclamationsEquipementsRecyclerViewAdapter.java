package com.example.gmao_mobile.Adapters;

import android.annotation.SuppressLint;
import android.graphics.Color;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gmao_mobile.Modeles.reclamations.Reclamation;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurEquipement;
import com.example.gmao_mobile.Modeles.reclamations.ReclamationSurTypePanne;
import com.example.gmao_mobile.R;
import com.google.android.material.chip.Chip;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReclamationsEquipementsRecyclerViewAdapter extends RecyclerView.Adapter<ReclamationsEquipementsRecyclerViewAdapter.ViewHolder> {
    private List<ReclamationSurEquipement> reclamationsList;

    public ReclamationsEquipementsRecyclerViewAdapter(List<ReclamationSurEquipement> reclamationsList) {
        this.reclamationsList = reclamationsList;
    }

    @NonNull
    @Override
    public ReclamationsEquipementsRecyclerViewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.reclamations_equipements_recycler_view_row, parent, false);
        return new ViewHolder(view);

    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public String differenceBetweenupdatedandnow() {
        String date1 = "20170717141000";
        String date2 = "20170719175500";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        Duration diff = Duration.between(LocalDateTime.parse(date1, formatter),
                LocalDateTime.parse(date2, formatter));
        String difference="";
        if (diff.isZero()) {
            return "0m";
        } else {
            long days = diff.toDays();
            if (days != 0) {
                difference+= "" + days + "d ";
                diff = diff.minusDays(days);
            }
            long hours = diff.toHours();
            if (hours != 0) {
                difference+= "" + hours + "h ";
                diff = diff.minusHours(hours);
            }
            long minutes = diff.toMinutes();
            if (minutes != 0) {
                difference+= "" + minutes + "m ";
                diff = diff.minusMinutes(minutes);
            }
            long seconds = diff.getSeconds();
            if (seconds != 0) {
                difference+= "" + seconds + "s ";
            }
            return difference;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public String differenceBetween(Date createdAt) {

        Date now = new Date();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String createdAtFormatted=formatter.format(createdAt.toInstant().atZone(ZoneId.systemDefault()));
        String nowFormatted=formatter.format(now.toInstant().atZone(ZoneId.systemDefault()));
        Duration diff = Duration.between(LocalDateTime.parse(createdAtFormatted, formatter),LocalDateTime.parse(nowFormatted, formatter));
        String difference="";
        if (!diff.isZero()) {
            long days = diff.toDays();
            if (days != 0) {
                difference= "" + days + "j ";
                diff = diff.minusDays(days);
            }
            long hours = diff.toHours();
            if (hours != 0 && days == 0) {
                difference= "" + hours + "h ";
                diff = diff.minusHours(hours);
            }
            long minutes = diff.toMinutes();
            if (minutes != 0 && days == 0 && hours==0) {
                difference= "" + minutes + "m ";
                diff = diff.minusMinutes(minutes);
            }
            long seconds = diff.getSeconds();
            if (seconds != 0 && days == 0 && hours==0 && minutes==0) {
                difference= "" + seconds + "s ";
            }

        }
        else {
            difference="0 minutes";
        }
        return difference;
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull ReclamationsEquipementsRecyclerViewAdapter.ViewHolder holder, int position) {
        holder.equipement.setText(reclamationsList.get(position).getEquipement().getDesignation());
        holder.local.setText(reclamationsList.get(position).getEquipement().getLocal().getDescription());
        switch (reclamationsList.get(position).getAvancement()){
            case 0:
                holder.avancement.setChipBackgroundColorResource(R.color.waiting_background);
                holder.avancement.setTextColor(Color.parseColor("#FF7366"));
                holder.avancement.setText("En Attente");
                holder.date.setText("Crée depuis "+differenceBetween(reclamationsList.get(position).getCreatedAt()));
                break;
            case 1:
                holder.avancement.setChipBackgroundColorResource(R.color.in_progress_background);
                holder.avancement.setTextColor(Color.parseColor("#051975"));
                holder.avancement.setText("En Cours");
                holder.date.setText("En Cours depuis "+differenceBetween(reclamationsList.get(position).getUpdatedAt()));
                break;
            case 2:
                holder.avancement.setChipBackgroundColorResource(R.color.finished_background);
                holder.avancement.setTextColor(Color.parseColor("#097A5C"));
                holder.avancement.setText("Terminé");
                holder.date.setText("Terminé depuis "+differenceBetween(reclamationsList.get(position).getUpdatedAt()));
        }
    }

    @Override
    public int getItemCount() {
        return reclamationsList.size();
    }



    public class ViewHolder extends  RecyclerView.ViewHolder{
        private TextView equipement;
        private TextView local;
        private Chip avancement;
        private TextView date;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            equipement=itemView.findViewById(R.id.equipement);
            local=itemView.findViewById(R.id.local);
            avancement=itemView.findViewById(R.id.avancement_equipement);
            date=itemView.findViewById(R.id.date_reclamation_equipement);
        }
    }
}
