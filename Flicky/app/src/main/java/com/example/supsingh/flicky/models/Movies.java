package com.example.supsingh.flicky.models;

import android.util.Log;

import com.example.supsingh.flicky.MovieActivity;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

import static com.example.supsingh.flicky.models.Movies.popularity_t.HIGH;
import static com.example.supsingh.flicky.models.Movies.popularity_t.LOW;
import static com.example.supsingh.flicky.models.Movies.popularity_t.MODERATE;

/**
 * Created by supsingh on 10/13/2016.
 */

public class Movies {

    public enum popularity_t {
        LOW, MODERATE, HIGH
    }

    String posterPath;
    String originalTitle;
    String overview;
    String backdropPath;

    public int getRating() {
        return rating;
    }

    int rating;
    public popularity_t popularity;

    public String getPosterPath() {
        return String.format("https://image.tmdb.org/t/p/w342/%s", posterPath);
    }

    public String getBackdropPath() {
        return String.format("https://image.tmdb.org/t/p/w780/%s", backdropPath);
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public String getOverview() {
        return overview;
    }

    public Movies(JSONObject jsonObject) throws JSONException {

        this.posterPath = jsonObject.getString("poster_path");
        this.originalTitle = jsonObject.getString("original_title");
        this.overview = jsonObject.getString("overview");
        this.backdropPath = jsonObject.getString("backdrop_path");
        this.rating = jsonObject.getInt("vote_average");

        int pop = this.rating;
        Log.d("sup: DEBUG", "movie: " + this.originalTitle + " pop = " + pop);
        if (pop < 3)
            this.popularity = LOW;
        else if (pop < 6)
            this.popularity = MODERATE;
        else
            this.popularity = HIGH;
    }


    // Static

    private static String url = "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed";
    private static ArrayList<Movies> MovieArrayList = null;

    public static ArrayList<Movies> getMovieArrayList() {
        return MovieArrayList;
    }

    public static ArrayList<Movies> fetchMovieArrayList(boolean refresh, final MovieActivity context) {
        Log.d("DEBUG", "sup: fetchMovieArrayList Called");
        if (MovieArrayList == null) {
            MovieArrayList = new ArrayList<Movies>();
        }

        if (MovieArrayList.isEmpty() != true && refresh != true) {
            Log.d("DEBUG", "sup: fetchMovieArrayList returning Called 1");
            return MovieArrayList;
        }

        AsyncHttpClient client = new AsyncHttpClient();
        client.get(url, new JsonHttpResponseHandler() {

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("DEBUG", "sup: onSuccess Called");
                // super.onSuccess(statusCode, headers, response);
                JSONArray movieJsonResults = null;
                try {
                    movieJsonResults = response.getJSONArray("results");
                    populateFromJSONArray(movieJsonResults);
                    context.notifyResponse();

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                Log.d("DEBUG", "sup: onFailure Called");
                super.onFailure(statusCode, headers, throwable, errorResponse);
            }
        });

        Log.d("DEBUG", "sup: fetchMovieArrayList returning Called 2");
        return MovieArrayList;
    }

    private static void populateFromJSONArray(JSONArray array) {
        MovieArrayList.clear();
        for (int x = 0; x < array.length(); x++) {
            try {
                MovieArrayList.add(new Movies(array.getJSONObject(x)));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
