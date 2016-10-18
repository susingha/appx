package com.example.supsingh.flicky.adapters;

import android.content.Context;
import android.content.res.Configuration;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.supsingh.flicky.R;
import com.example.supsingh.flicky.models.Movies;
import com.squareup.picasso.Picasso;

import java.util.List;

import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;

/**
 * Created by supsingh on 10/13/2016.
 */

public class MovieArrayAdapter extends ArrayAdapter<Movies> {


    public MovieArrayAdapter(Context context, List<Movies> movies) {
        super(context, android.R.layout.simple_expandable_list_item_1, movies);
    }

    // Return an integer representing the type by fetching the enum type ordinal
    @Override
    public int getItemViewType(int position) {
        return getItem(position).popularity.ordinal();
    }

    // Total number of types is the number of enum values
    @Override
    public int getViewTypeCount() {
        return Movies.popularity_t.values().length;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        Log.d("INFO", "getView called");

        // get the data item for the position
        ViewHolder mainViewHolder = null;
        Movies movie = getItem(position);
        int type = getItemViewType(position);

        // check the existing view being reused
        if (convertView == null) {
            convertView = getInflatedLayoutForType(type);
            mainViewHolder = generateViewHolder(convertView, type);
            convertView.setTag(mainViewHolder);
        }

        mainViewHolder = (ViewHolder) convertView.getTag();

        // find the image view and clear out the image
        ImageView ivImage = mainViewHolder.ivImage_static;
        // ivImage.setImageResource(0);
        TextView tvTitle = mainViewHolder.tvTitle_static;
        TextView tvOverview = mainViewHolder.tvOverview_static;

        // Populate
        if (tvTitle != null)
            tvTitle.setText(movie.getOriginalTitle());
        if (tvOverview != null)
        tvOverview.setText(movie.getOverview());

        if (type == Movies.popularity_t.LOW.ordinal() || type == Movies.popularity_t.MODERATE.ordinal()) {
            if (getContext().getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                Picasso.with(getContext()).load(movie.getPosterPath()).transform(new RoundedCornersTransformation(10, 10)).into(ivImage);
            }
            if (getContext().getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
                Picasso.with(getContext()).load(movie.getBackdropPath()).transform(new RoundedCornersTransformation(10, 10)).into(ivImage);
            }
        } else if (type == Movies.popularity_t.HIGH.ordinal()) {
            Picasso.with(getContext()).load(movie.getBackdropPath()).transform(new RoundedCornersTransformation(10, 10)).into(ivImage);
        }

        // return the view
        return convertView;
    }

    private View getInflatedLayoutForType(int type) {
        LayoutInflater inflater = LayoutInflater.from(getContext());

        if (type == Movies.popularity_t.LOW.ordinal()) {
            return inflater.inflate(R.layout.item_movie, null);
        } else if (type == Movies.popularity_t.MODERATE.ordinal()) {
            return inflater.inflate(R.layout.item_movie, null);
        } else if (type == Movies.popularity_t.HIGH.ordinal()) {
            return inflater.inflate(R.layout.item_movie_popular, null);
        } else {
            return null;
        }
    }

    private ViewHolder generateViewHolder(View convertView, int type) {
        ViewHolder viewHolder = null;
        viewHolder = new ViewHolder();

        if (type == Movies.popularity_t.LOW.ordinal()) {

            viewHolder.ivImage_static = (ImageView) convertView.findViewById(R.id.ivMovieImage);
            viewHolder.tvTitle_static = (TextView) convertView.findViewById(R.id.tvTitle);
            viewHolder.tvOverview_static = (TextView) convertView.findViewById(R.id.tvOverview);

        } else if (type == Movies.popularity_t.MODERATE.ordinal()) {

            viewHolder.ivImage_static = (ImageView) convertView.findViewById(R.id.ivMovieImage);
            viewHolder.tvTitle_static = (TextView) convertView.findViewById(R.id.tvTitle);
            viewHolder.tvOverview_static = (TextView) convertView.findViewById(R.id.tvOverview);

        } else if (type == Movies.popularity_t.HIGH.ordinal()) {

            viewHolder.ivImage_static = (ImageView) convertView.findViewById(R.id.ivMovieImage);
            viewHolder.tvTitle_static = (TextView) convertView.findViewById(R.id.tvTitle);
            viewHolder.tvOverview_static = null;

        } else {
            viewHolder = null;
        }

        return viewHolder;
    }
}

class ViewHolder {
    ImageView ivImage_static;
    TextView tvTitle_static;
    TextView tvOverview_static;
}
