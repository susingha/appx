# Pre-work - **SimpleTodo**

**SimpleTodo** is an android app that allows building a todo list and basic todo items management functionality including adding new items, editing and deleting an existing item.

Submitted by: **Supratik Singha**

Time spent: **40** hours spent in total

## User Stories

The following **required** functionality is completed:

* [x] User can **successfully add and remove items** from the todo list
* [x] User can **tap a todo item in the list and bring up an edit screen for the todo item** and then have any changes to the text reflected in the todo list.
* [x] User can **persist todo items** and retrieve them properly on app restart

The following **optional** features are implemented:

* [x] Persist the todo items [into SQLite](http://guides.codepath.com/android/Persisting-Data-to-the-Device#sqlite) instead of a text file
* [x] Improve style of the todo items in the list [using a custom adapter](http://guides.codepath.com/android/Using-an-ArrayAdapter-with-ListView)
* [x] Add support for ~~completion due dates~~ (Description) for todo items (and display within listview item)
* [x] Tweak the style improving the UI / UX, ~~play with colors, images or backgrounds~~

The following **additional** features are implemented:

* [x] Splash Screen: Added Splash Screen at initial app startup
* [x] Quick Delete Buttons: Long Press on items show / hide Quick Delete buttons (displayed within listview item)
* [x] Edit and Delete: Items can be deleted from the Edit screen

## Video Walkthrough 

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/cnfGmFx.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Notes

Challenges:
- Being a beginner in Java Programming, I used my C++ knowledge to ramp up the Object Oriented design aspects.
- Implementing the custom ArrayAdapter class took some time to get right.
- Data Structure: Deciding whether to use a two column ArrayList or not to show exyra fields in the ListView. But since the main activity was showing only one field, I decided to use a single column ArrayList and put the extra fields in SQLite Database.

## License

    Copyright [2016] [Supratik Singha]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.