Meteor.methods({
  exportPDF:function(exportable){
    // First, we check what's going to be exported
    var news = News.find({groupId: {$in: exportable.groupsIds }, brandId: {$in: exportable.brandsIds}, date: {$lte: exportable.toDate, $gte: exportable.fromDate} }).fetch();

    // we create our document
    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(12);

    // we get the logo and place it
    var result = request.getSync('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', {
        encoding: null
    });
    var buffer = result.body;
    doc.image(buffer, 400, 10, { width: 100 });

    // then we put all the data in the file
    // for images
    var images = [];
    for(key in news){
      if(key != 0){
        // we add a new page per new
        doc.addPage();
      }

      // we put the image
      console.log(news[key].media[0].url);
      images.push(request.getSync('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', {
          encoding: null
      }));
      // http://localhost:3000/gridfs/data/id/5263c1ffdc1b6e10fa24f3a6

      //var buffer = image.body;
      doc.image(images[images.length-1].body, 0, 50);

      // then the content:
      doc.text('TITULO: '+news[key].title).text('SUPLEMENTO: '+news[key].suplement).text('FECHA: '+news[key].date).text('CENTIMETRAJE: '+news[key].size);

    }

    return doc.outputSync();
  }
});
