# Reverse Indent

A simple command-line app that reverses the indentation of code file(s), inspired by this post [on r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor/comments/rsltjk/i_present_you_guys_4_space_indentation/?utm_source=share&utm_medium=ios_app&utm_name=iossmf). This has no useful purpose other than annoying/scaring your collaborators. 

## Installation
Assuming `npm` is installed on the machine
```
npm install -g reverse-indent
```

## Usage
`reverse-indent` can be used on a single file or on all files in a folder
```
reverse-indent path/to/file_or_folder
```
By default, all files will be changed. If you want to specify the extensions of the files you want to edit, then use the `types` option
```
reverse-indent path/to/file_or_folder --types ".c" ".js"
```
If you want to undo the changes `reverse-indent` makes, just run it again: the reverse of the reverse should give you the original.

<strong> Please don't try this on any important code. It has not been rigorously tested 😄</strong>