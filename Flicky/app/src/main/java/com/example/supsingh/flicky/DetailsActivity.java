package com.example.supsingh.flicky;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.example.supsingh.flicky.models.Movies;
import com.squareup.picasso.Picasso;

import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;

/**
 * Created by supsingh on 10/16/2016.
 */

public class DetailsActivity extends AppCompatActivity {

    private ImageView ivBackdrop_static;
    private TextView tvOverview_static;
    private ImageView ivPoster_static;
    private TextView tvTitle_static;
    private RatingBar rbRating_static;


    protected void onCreate(Bundle savedInstanceState) {
        Log.d("DEBUG", "onCreate called");

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);

        if (ivBackdrop_static == null)
            ivBackdrop_static = (ImageView) findViewById(R.id.ivBackdrop);

        if (tvTitle_static == null)
            tvTitle_static = (TextView) findViewById(R.id.tvTitle);

        if (ivPoster_static == null)
            ivPoster_static = (ImageView) findViewById(R.id.ivPoster);

        if (tvOverview_static == null)
            tvOverview_static = (TextView) findViewById(R.id.tvOverview);

        if (rbRating_static == null)
            rbRating_static = (RatingBar) findViewById(R.id.rbRating);


        int pos = getIntent().getIntExtra("pos", 0);

        Movies movie = Movies.getMovieArrayList().get(pos);
        Log.d("sup: DEBUG", "pos = " + pos);

        Picasso.with(this).load(movie.getBackdropPath()).into(ivBackdrop_static);
        tvTitle_static.setText(movie.getOriginalTitle());
        Picasso.with(this).load(movie.getPosterPath()).transform(new RoundedCornersTransformation(10, 10)).into(ivPoster_static);
        tvOverview_static.setText(movie.getOverview());
        rbRating_static.setRating(movie.getRating()/2);
    }

}

