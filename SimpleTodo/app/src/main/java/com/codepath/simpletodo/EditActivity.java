package com.codepath.simpletodo;

import android.database.Cursor;
import android.support.v7.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;



public class EditActivity extends AppCompatActivity {

    ViewHolder mainViewholder = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit);

        int request = getIntent().getIntExtra("Request", 0);

        switch (request) {
            case GlobalCommon.REQUEST_CODE_ADD:
                handleOnCreateAdd();
                break;
            case GlobalCommon.REQUEST_CODE_EDIT:
                handleOnCreateEdit();
                break;
            default:
                break;
        }


    }

    public void handleOnCreateAdd() {
        String itemText = getIntent().getStringExtra("Title");
        if (mainViewholder == null)
            mainViewholder = new ViewHolder((EditText) findViewById(R.id.editTitle), (EditText) findViewById(R.id.editDesc), (Button)findViewById(R.id.buttonDelete));

        mainViewholder.deleteButton.setVisibility(mainViewholder.deleteButton.getRootView().GONE);
        mainViewholder.editDesc.setFocusable(true);
        mainViewholder.editDesc.requestFocus();
        mainViewholder.editTitle.setText(itemText);
    }

    public void handleOnCreateEdit() {
        int pos = getIntent().getIntExtra("Pos", -1);

        DBHelper mydb = DBHelper.getInstance(this);
        Cursor res = mydb.getDataAt(pos);
        res.moveToFirst();
        String itemText = res.getString(res.getColumnIndex(DBHelper.ITEMS_COLUMN_TITLE));
        String itemDesc = res.getString(res.getColumnIndex(DBHelper.ITEMS_COLUMN_DESC));

        if (mainViewholder == null)
            mainViewholder = new ViewHolder((EditText) findViewById(R.id.editTitle), (EditText) findViewById(R.id.editDesc), (Button)findViewById(R.id.buttonDelete));

        mainViewholder.editTitle.setText(itemText);
        mainViewholder.editDesc.setText(itemDesc);
        mainViewholder.deleteButton.setVisibility(mainViewholder.deleteButton.getRootView().VISIBLE);
    }

    public void onSubmit(View v) {
        mainViewholder.deleteButton.setVisibility(mainViewholder.deleteButton.getRootView().GONE);
        Intent ret = new Intent();
        ret.putExtra("Delete", false);
        ret.putExtra("Title", mainViewholder.editTitle.getText().toString());
        ret.putExtra("Desc", mainViewholder.editDesc.getText().toString());
        setResult(RESULT_OK, ret);
        finish();
    }

    public void onDelete(View v) {
        mainViewholder.deleteButton.setVisibility(mainViewholder.deleteButton.getRootView().GONE);
        Intent ret = new Intent();
        ret.putExtra("Delete", true);
        setResult(RESULT_OK, ret);
        finish();
    }

    public class ViewHolder {
        EditText editTitle;
        EditText editDesc;
        Button deleteButton;

        public ViewHolder(EditText editTitle_, EditText editDesc_, Button deleteButton_) {
            editTitle = editTitle_;
            editDesc = editDesc_;
            deleteButton = deleteButton_;
        }
    }
}
