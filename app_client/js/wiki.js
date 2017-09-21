/**
 * Source: http://jsfiddle.net/gautamadude/HMJJg/1/
 * @param url "Fake"-URL used to query wikipedia
 */
function queryWiki(url) {

    var title = url.split("/");
    title = title[title.length - 1];
    var first_paragraph;

 $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&prop=exintro=true&page=" + title + "&prop=text&section=0&format=json&callback=?", function (data) {

     var paragraph = "";

     for (text in data.parse.text) {
         var text = data.parse.text[text].split("<p>");
         var pText = "";

         for (p in text) {
             //Remove html comment
             text[p] = text[p].split("<!--");
             if (text[p].length > 1) {
                 text[p][0] = text[p][0].split(/\r\n|\r|\n/);
                 text[p][0] = text[p][0][0];
                 text[p][0] += "</p> ";
             }
             text[p] = text[p][0];

             //Construct a string from paragraphs
             if (text[p].indexOf("</p>") == text[p].length - 5) {
                 var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
                 var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
                 for (newline in splitNewline) {
                     if (splitNewline[newline].substring(0, 11) != "Cite error:") {
                         pText += splitNewline[newline];
                         pText += "\n";
                     }
                 }
             }
         }
         pText = pText.substring(0, pText.length - 2); //Remove extra newline
         pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)

         var first = pText.split("\n", 1); // Leaves only the first paragraph
     }
     console.log("innen: " + first);
     paragraph = first;
     return paragraph;
 });
 console.log("mitte " + paragraph);
 first_paragraph = paragraph;
 return first_paragraph;
 console.log("außen " + first_paragraph);
}