This project is a React application representing a dataset as a tree view. It embbed a search allowing the user 
to search for a given string within the dataset's tree view.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
It uses jest and enzyme to perform unit testing on the components and "prop-types" to perform components props 
validation.

## Table of content
- [Getting started](#getting-started)
- [Controller](#controller)
    - [App](#app)
- [Available Components](#available-components)
    - [Search](#search)
    - [TreeView](#treeview)
    - [TreeViewElement](#treeviewelement)
 

## Getting started


Below you will find some information on how to perform common tasks.

Main commands:
 - `npm start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in 
 the browser. The page will reload if you make edits. You will also see any lint errors in the console.
 - `npm test`: Launches the test runner in the interactive watch mode
 - `npm test -- --coverage`: Perform test coverage on App.js, Search.js, TreeView.js and TreeViewElement.js
 

## Controller

## `App`

App act as a super component rendering both Search and TreeView components. It handles the search by passing a 
handleSearch function as callback to Search component. HandleSearch function calls search recursive pure function to 
filter the items based on the search term.

Given a list of items, a search term and a highlight boolean, the algorithm act as follows:

For each item.
1. If the current item is a tree node, i.e has sub items, recursively call search on it's sub items
    - If the search returns a non empty list set the current item's items property to the result of the search.
    - If the search term match the item's name and highlight is true set the item's highlightStr property to the search 
    term value
    - If the search has returned a non empty list OR search term match the item's name add the item to the list, otherwise
    returns an empty list.
2. If the current item is a tree leaf, i.e items is null, check if search term match item's name
    - If yes: add this item to the list and if highlight is true, set the item's highlightStr property to the search 
    term value.
    - if no: return an empty list
    
App then passes the filtered list of items to TreeView component if a search is in progress or the orginal list of items 
(read from ./data/sectors.json) otherwise.

| State | Description | Type | Initial value |
| ----- | ----------- | ---- | ------------- |
| searchResults | Result of the search of search term performed on the original data set | Array[Object] | null

## Available Components

## `Search`

Usage: `import Search from "./components/Search`

The search component represents the App search bar. It is used to perform a search by search term on the data displayed 
in the TreeView. It also contains a highlight button, active by default, that allow to highlight the search term in the 
TreeView.

| Props | Description | Type | isRequired |
| ----- | ----------- | ---- | ---------- |
| onChange | Callback called on search input change | Function | Yes
| timeout | The amount in milliseconds after which onChange callback will be invoked | Number | No
| placeholder | String to be displayed as placeholder in the input element | String | No


| State | Description | Type | Initial value |
| ----- | ----------- | ---- | ------------- |
| highlight | State of the highlight button of the search bar (true=activated) | Boolean | true

## `TreeView`

Usage: `import TreeView from "./components/TreeView`

TreeView functional component is used as a wrapper around TreeViewElement. It takes a list of items and for each of them 
renders a TreeViewElement component inside an unordered list (ul element). It also accept child nodes that will be 
renders after the items. Hence, developers can either pass a list of objects (items) to TreeView component, thus 
delegating the generation of TreeViewElements to the component, or build TreeViewElement themselves and pass them as 
children.

| Props | Description | Type | isRequired |
| ----- | ----------- | ---- | ---------- |
| items | Array of item objects to be rendered as TreeViewElement | Array[Object] | No
| children | Any node that can be rendered will be rendered after the items | Node | No

An example of item:
```js
{
  "id": "1",
  "name": "item1",
  "items": [
      "id": "2",
      "name": "item2",
      "items": null
  ],
  "isExpanded": true, // Optional
  "highlightStr": "it" // Optional 
}
```


## `TreeViewElement`

Usage: `import { TreeViewElement } from "./components/TreeView`

TreeViewElement represent an entry in the TreeView. It expands when clicked and revealed its sub items as TreeElement 
(recursive component).

| Props | Description | Type | isRequired |
| ----- | ----------- | ---- | ---------- |
| name | Name of the element that will be displayed in a list item (li) | String | Yes
| items | Array of item objects to be rendered as TreeViewElement | Array[Object] | No
| isExpanded | If set turns the component into a controlled component, i.e override isExpanded state | Boolean | No
| highlightStr | Sub string to be highlighted in name | String | No


| State | Description | Type | Initial value |
| ----- | ----------- | ---- | ------------- |
| isExpanded | State if the item should reveal its sub items. State is changed when the list item (li) is clicked | Boolean | false
