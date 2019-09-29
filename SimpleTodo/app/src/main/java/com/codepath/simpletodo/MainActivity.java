package com.codepath.simpletodo;


import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.os.Handler;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ArrayList<String> itemsTitle;
    MyListAdapter itemsAdapter;
    ListView lvItems;
    DBHelper mydb;

    boolean saveList = true;
    int useStorage = GlobalCommon.DATABASE_CODE;
    int inDeleteMode = 0;
    int editIndex = -1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (useStorage == GlobalCommon.DATABASE_CODE)
            mydb = DBHelper.getInstance(this);

        inDeleteMode = 0;
        if (saveList) {
            readItems();
        } else {
            itemsTitle = new ArrayList<String>();
        }
        lvItems = (ListView) findViewById(R.id.lvItems);
        itemsAdapter = new MyListAdapter(this, R.layout.list_item, itemsTitle);
        lvItems.setAdapter(itemsAdapter);
        if (!saveList) {
            itemsTitle.add("First Item");
            itemsTitle.add("Second Item");
        }
        setupListViewListener();
    }

    private void setupListViewListener() {

        lvItems.setOnItemClickListener(
                new AdapterView.OnItemClickListener() {

                    @Override
                    public void onItemClick(AdapterView<?> adapter, View v, int pos, long id) {
                        launchEditActivity(v, pos, id);
                    }
                }

        );

        lvItems.setOnItemLongClickListener(
                new AdapterView.OnItemLongClickListener() {

                    @Override
                    public boolean onItemLongClick(AdapterView<?> adapter, View v, int pos, long id) {
                        toggleDeleteButtons(v);
                        return true;
                    }
                }
        );
    }

    public void toggleDeleteButtons(View v) {
        inDeleteMode = 1 - inDeleteMode;
        itemsAdapter.notifyDataSetChanged();
    }

    public boolean removeItemGlobal(int pos) {
        itemsTitle.remove(pos);
        itemsAdapter.notifyDataSetChanged();
        if (saveList) {
            writeItems(GlobalCommon.REQUEST_CODE_DEL, pos, null, null);
        }
        return true;
    }

    private boolean confirmDelete(int position) {
        return true;
    }

    public void onAddItem(View v) {
        EditText etNewItem = (EditText) findViewById(R.id.etNewItem);
        String titleText = etNewItem.getText().toString();
        if (!titleText.isEmpty())
            launchAddActivity(v);
        else
            Toast.makeText(this, "Type Item Name", Toast.LENGTH_SHORT).show();
    }


    ////////////////// Next Activity ////////////////

    public void launchEditActivity(View v, int pos, long id) {
        int request = GlobalCommon.REQUEST_CODE_EDIT;

        Intent i = new Intent(MainActivity.this, EditActivity.class);
        i.putExtra("Request", request);
        i.putExtra("Pos", pos);
        editIndex = pos;

        startActivityForResult(i, GlobalCommon.REQUEST_CODE_EDIT);
    }

    public void launchAddActivity(View v) {
        int request = GlobalCommon.REQUEST_CODE_ADD;

        Intent i = new Intent(MainActivity.this, EditActivity.class);
        EditText etNewItem = (EditText) findViewById(R.id.etNewItem);
        String titleText = etNewItem.getText().toString();
        i.putExtra("Request", request);
        i.putExtra("Title", titleText);

        startActivityForResult(i, request);
    }

    protected void onActivityResult(int request_code, int result_code, Intent data) {
        switch (request_code) {
            case GlobalCommon.REQUEST_CODE_ADD:
                handleAddActivityResult(result_code, data);
                break;
            case GlobalCommon.REQUEST_CODE_EDIT:
                handleEditActivityResult(result_code, data);
                break;
            default:
                break;

        }
    }

    private void handleAddActivityResult(int result_code, Intent data) {
        if (result_code != RESULT_OK)
            return;

        EditText etNewItem = (EditText) findViewById(R.id.etNewItem);
        etNewItem.setText("");

        String titleText = data.getExtras().getString("Title");
        String descText = data.getExtras().getString("Desc");

        itemsTitle.add(titleText);
        itemsAdapter.notifyDataSetChanged();
        if (saveList) {
            writeItems(GlobalCommon.REQUEST_CODE_ADD, -1, titleText, descText);
        }
    }

    private void handleEditActivityResult(int result_code, Intent data) {
        if (result_code != RESULT_OK)
            return;

        int pos = editIndex;
        boolean delete = data.getBooleanExtra("Delete", false);

        if (delete) {
            removeItemGlobal(pos);
        } else {
            String titleText = data.getExtras().getString("Title");
            String descText = data.getExtras().getString("Desc");
            itemsTitle.set(pos, titleText);
            itemsAdapter.notifyDataSetChanged();
            if (saveList) {
                writeItems(GlobalCommon.REQUEST_CODE_EDIT, pos, titleText, descText);
            }
        }

        editIndex = -1;
    }

    ////////////////// File IO //////////////////////

    private void writeItems(int action, int pos, String Title, String Desc) {

        switch (useStorage) {
            case GlobalCommon.DATABASE_CODE:

                switch (action) {
                    case GlobalCommon.REQUEST_CODE_ADD:
                        mydb.insertItem(Title, Desc);
                        break;
                    case GlobalCommon.REQUEST_CODE_EDIT:
                        mydb.updateItemPos(pos, Title, Desc);
                        break;
                    case GlobalCommon.REQUEST_CODE_DEL:
                        mydb.deleteItemPos(pos);
                        break;
                    default:
                        break;
                }

                break;

            case GlobalCommon.TEXTFILE_CODE:
                File filesDir = getFilesDir();
                File todoFile = new File(filesDir, "todo.txt");
                try {
                    FileUtils.writeLines(todoFile, itemsTitle);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                break;
        }
    }

    private void readItems() {
        switch (useStorage) {
            case GlobalCommon.DATABASE_CODE:
                itemsTitle = mydb.getAllItems();
                break;

            case GlobalCommon.TEXTFILE_CODE:
                File filesDir = getFilesDir();
                File todoFile = new File(filesDir, "todo.txt");

                try {
                    itemsTitle = new ArrayList<String>(FileUtils.readLines(todoFile));
                } catch (IOException e) {
                    itemsTitle = new ArrayList<String>();
                }
                break;

            default:
                break;
        }
    }


    /////////////////// Layover Trash Button ///////////////////////

    private class MyListAdapter extends ArrayAdapter<String> {
        private int layout;
        private List<String> mObjects;
        private ViewHolder mainViewholder = null;


        private MyListAdapter(Context context, int resource, List<String> objects) {

            super(context, resource, objects);
            mObjects = objects;
            layout = resource;

        }

        @Override
        public View getView(final int position, View convertView, ViewGroup parent) {

            if (convertView == null) {
                LayoutInflater inflater = LayoutInflater.from(getContext());
                convertView = inflater.inflate(layout, parent, false);
                ViewHolder viewHolder = new ViewHolder();
                viewHolder.buttonTrash = (ImageView) convertView.findViewById(R.id.imageTrash);
                viewHolder.textItem = (TextView) convertView.findViewById(R.id.itemText);
                convertView.setTag(viewHolder);
            }

            if (1 == inDeleteMode) {
                showLayoutDeleteButtons(convertView);
            } else {
                hideLayoutDeleteButtons(convertView);
            }


            mainViewholder = (ViewHolder) convertView.getTag();
            mainViewholder.buttonTrash.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    boolean retDeleted = false;
                    if (confirmDelete(position)) {
                        retDeleted = removeItemGlobal(position);
                        if (retDeleted)
                            Toast.makeText(getContext(), "Deleted item: " + position, Toast.LENGTH_SHORT).show();
                        else
                            Toast.makeText(getContext(), "Could not delete item: " + position, Toast.LENGTH_SHORT).show();

                    }
                }
            });

            mainViewholder.textItem.setText(getItem(position));
            return convertView;
        }

        public void showLayoutDeleteButtons(View v) {
            if (mainViewholder == null)
                return;
            mainViewholder.buttonTrash.setVisibility(v.VISIBLE);
            return;
        }

        public void hideLayoutDeleteButtons(View v) {
            if (mainViewholder == null)
                return;
            mainViewholder.buttonTrash.setVisibility(v.GONE);
            return;
        }
    }

    public class ViewHolder {
        ImageView buttonTrash;
        TextView textItem;
    }
}