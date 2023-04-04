# prompt-tool

Instructions:
1. install the gpt tool  --  sudo npm install -g gpt-prompt-tool
2. Use the tool in terminal by navigating to the directory where the files are stored that you wish to copy together, and use the command:
npx combiner <file1> <file2> <file3> ...
3. if you don't specify the files you would like to copy together, then it will automatically put together all of the files in the current directory (including all the files in the subdirectories)

The result is a .txt document saved to your desktop, that contains the text from all of these files. Before the text for each file is the phrase:

//// The below text is from a ___x_____ file from ____y___

where x is the file type (i.e. .js), and y is the directory from where the file came.



When prompting chatGPT, you can tell it beforehand that each of the files in your code is separated by that specific phrase.
