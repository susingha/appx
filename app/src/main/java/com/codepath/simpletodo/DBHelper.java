package com.codepath.simpletodo;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import java.util.ArrayList;

/**
 * Created by supratik on 8/9/2016.
 */
public class DBHelper extends SQLiteOpenHelper {

    private final boolean print_db = false;

    public static final String DATABASE_NAME = "Items.db";
    public static final String ITEMS_TABLE_NAME = "ItemsTable";
    public static final String ITEMS_COLUMN_TIMESTAMP = "timestamp";
    public static final String ITEMS_COLUMN_TITLE = "title";
    public static final String ITEMS_COLUMN_DESC = "desc";

    // Lazy Singleton
    private static DBHelper mydbInstanceHolder = null;
    public static synchronized DBHelper getInstance(Context context) {
        if(mydbInstanceHolder == null)
            mydbInstanceHolder = new DBHelper(context);
        return mydbInstanceHolder;
    }

    public DBHelper(Context context) {
        super(context, DATABASE_NAME, null, 1);
    }



    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE " + ITEMS_TABLE_NAME + "(" + ITEMS_COLUMN_TIMESTAMP + " integer primary key, " + ITEMS_COLUMN_TITLE + " text, " + ITEMS_COLUMN_DESC + " text)");

        if (print_db) printTable(db);
    }

    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + ITEMS_TABLE_NAME);
        onCreate(db);
    }

    public boolean insertItem(String Title, String Desc) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(ITEMS_COLUMN_TIMESTAMP, System.currentTimeMillis());
        values.put(ITEMS_COLUMN_TITLE, Title);
        values.put(ITEMS_COLUMN_DESC, Desc);
        db.insert(ITEMS_TABLE_NAME, null, values);

        if (print_db) printTable(db);
        return true;
    }

    public Cursor getDataAt(int pos) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res = db.rawQuery("select * from " + ITEMS_TABLE_NAME + " ORDER BY " + ITEMS_COLUMN_TIMESTAMP + " LIMIT 1 OFFSET " + pos, null);

        if (print_db) printTable(db);
        return res;
    }

    public Cursor getAllData(SQLiteDatabase db) {
        if (db == null)
            db = this.getReadableDatabase();

        Cursor res = db.rawQuery("select * from " + ITEMS_TABLE_NAME, null);
        return res;
    }

    public int numberOfRows() {
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils.queryNumEntries(db, ITEMS_TABLE_NAME);

        if (print_db) printTable(db);
        return numRows;
    }

    public boolean updateItem(long Timestamp, String Title, String Desc) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(ITEMS_COLUMN_TITLE, Title);
        contentValues.put(ITEMS_COLUMN_DESC, Desc);
        db.update(ITEMS_TABLE_NAME, contentValues, ITEMS_COLUMN_TIMESTAMP + " = ? ", new String[]{Long.toString(Timestamp)});

        if (print_db) printTable(db);
        return true;
    }

    public void updateItemPos(int pos, String Title, String Desc) {
        Cursor res = getDataAt(pos);
        res.moveToFirst();
        Long timestamp = res.getLong(res.getColumnIndex(ITEMS_COLUMN_TIMESTAMP));
        updateItem(timestamp, Title, Desc);
    }

    public Integer deleteItem(long Timestamp) {
        int ret = 0;
        SQLiteDatabase db = this.getWritableDatabase();
        ret = db.delete(ITEMS_TABLE_NAME, ITEMS_COLUMN_TIMESTAMP + " = ? ", new String[]{Long.toString(Timestamp)});

        if (print_db) printTable(db);
        return ret;
    }

    public void deleteItemPos(int pos) {
        Cursor res = getDataAt(pos);
        res.moveToFirst();
        Long timestamp = res.getLong(res.getColumnIndex(ITEMS_COLUMN_TIMESTAMP));
        deleteItem(timestamp);
    }

    public ArrayList<String> getAllItems() {
        ArrayList<String> array_list = new ArrayList<String>();

        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res = getAllData(db);
        res.moveToFirst();

        while (res.isAfterLast() == false) {
            array_list.add(res.getString(res.getColumnIndex(ITEMS_COLUMN_TITLE)));
            res.moveToNext();
        }

        if (print_db) printTable(db);
        return array_list;
    }

    public void printTable(SQLiteDatabase db) {
        int pos = 0;
        if (db == null)
            db = this.getReadableDatabase();

        Cursor res = getAllData(db);
        res.moveToFirst();

        Log.e("Fields:", " pos,   ITEMS_COLUMN_TIMESTAMP,   ITEMS_COLUMN_TITLE,   ITEMS_COLUMN_DESC");
        while (res.isAfterLast() == false) {
            Log.e("Table:",
                    pos + ",   " +
                    res.getString(res.getColumnIndex(ITEMS_COLUMN_TIMESTAMP)) + ",   " +
                    res.getString(res.getColumnIndex(ITEMS_COLUMN_TITLE)) + ",   " +
                    res.getString(res.getColumnIndex(ITEMS_COLUMN_DESC)));
            res.moveToNext();
            pos++;
        }
    }
}
