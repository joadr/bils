NewsData.after.update(function(userId, doc) {
  if (doc.data) {
    News.update(doc.articleId, { $addToSet: { categorizedBy: doc.agencyId } });
  } else {
    News.update(doc.articleId, { $pull: { categorizedBy: doc.agencyId } });
  }
});
