package com.example.supsingh.flicky;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.example.supsingh.flicky.adapters.MovieArrayAdapter;
import com.example.supsingh.flicky.models.Movies;

import java.util.ArrayList;

public class MovieActivity extends AppCompatActivity {

    private SwipeRefreshLayout swipeContainer;

    ArrayList<Movies> movies;
    MovieArrayAdapter movieAdapter;
    ListView lvItems;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("DEBUG", "onCreate called");

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie);

        swipeContainer = (SwipeRefreshLayout) findViewById(R.id.swipeContainer);
        swipeContainer.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                // Your code to refresh the list here.
                // Make sure you call swipeContainer.setRefreshing(false)
                // once the network request has completed successfully.
                fetchTimelineAsync(0);
            }
        });


        //movies = new ArrayList<>();
        lvItems = (ListView) findViewById(R.id.lvMovies);
        //movies.addAll(Movies.fetchMovieArrayList(false));
        movies = Movies.fetchMovieArrayList(false, this);
        movieAdapter = new MovieArrayAdapter(this, movies);
        lvItems.setAdapter(movieAdapter);
        setupListViewListener();
    }

    public void notifyResponse() {
        movieAdapter.notifyDataSetChanged();
        swipeContainer.setRefreshing(false);
    }



    public void fetchTimelineAsync(int page) {
        Log.d("INFO", "fetchTimelineAsync called, page = " + page);
        movies = Movies.fetchMovieArrayList(true, this);
    }

    private void setupListViewListener() {
        lvItems.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapter, View v, int pos, long id) {
                launchDetailsActivity(v, pos, id);
            }
        });
    }

    // Details Activity
    public void launchDetailsActivity(View v, int pos, long id) {
        Intent i = new Intent(MovieActivity.this, DetailsActivity.class);
        i.putExtra("pos", pos);

        startActivity(i);
    }
}
