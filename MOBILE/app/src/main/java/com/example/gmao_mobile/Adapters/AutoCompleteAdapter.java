package com.example.gmao_mobile.Adapters;

import android.content.Context;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.gmao_mobile.Modeles.CountryItem;
import com.example.gmao_mobile.Modeles.Room;
import com.example.gmao_mobile.R;

import java.util.ArrayList;
import java.util.List;


public class AutoCompleteAdapter extends ArrayAdapter<Room> {
    private List<Room> countryListFull;

    public AutoCompleteAdapter(@NonNull Context context, @NonNull List<Room> countryList) {
        super(context, 0, countryList);
        countryListFull = new ArrayList<>(countryList);
    }

    @NonNull
    @Override
    public Filter getFilter() {
        return countryFilter;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        /*if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(
                    R.layout.room_autocomplete_row, parent, false
            );
        }*/

        TextView textViewName = convertView.findViewById(R.id.room_number);
        //ImageView imageViewFlag = convertView.findViewById(R.id.image_view_flag);

        Room countryItem = getItem(position);

        if (countryItem != null) {
            textViewName.setText(countryItem.getNumero());
            //imageViewFlag.setImageResource(countryItem.getFlagImage());
        }

        return convertView;
    }

    private Filter countryFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults results = new FilterResults();
            List<Room> suggestions = new ArrayList<>();

            if (constraint == null || constraint.length() == 0) {
                suggestions.addAll(countryListFull);
            } else {
                String filterPattern = constraint.toString().toLowerCase().trim();

                for (Room item : countryListFull) {
                    if (String.valueOf(item.getNumero()).toLowerCase().contains(filterPattern)) {
                        suggestions.add(item);
                    }
                }
            }

            results.values = suggestions;
            results.count = suggestions.size();

            return results;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            clear();
            addAll((List) results.values);
            notifyDataSetChanged();
        }

        @Override
        public CharSequence convertResultToString(Object resultValue) {
            return String.valueOf(((Room) resultValue).getNumero());
        }
    };
}