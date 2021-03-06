const defaultExtractor = require('./default');
const previewExtractor = require('./preview');
const { imgurResourceExtractor, imgurAlbumExtractor } = require('./imgur');
const { gfycatResourceExtractor } = require('./gfycat');

const canExtractFromPreview = preview => {
  return false; /*(
    preview.images &&
    preview.images.length > 0 &&
    !preview.images[0].source.url.includes('.gif') // we cannot access reddit gifs
  );*/
};

const extractMediaFromPost = post => {
  const domain = post.domain.toLowerCase();
  if (
    post.preview &&
    canExtractFromPreview(post.preview) &&
    !post.url.includes('.gif')
  ) {
    return previewExtractor(post);
  } else if (domain.includes('imgur')) {
    return imgurResourceExtractor(post);
  } else if (domain.includes('gfycat')) {
    return gfycatResourceExtractor(post);
  } else {
    return defaultExtractor(post);
  }
};

const extractAlbumFromPost = post => {
  if (post.domain.includes('imgur')) {
    return imgurAlbumExtractor(post);
  } else {
    return null;
  }
};

module.exports = { extractMediaFromPost, extractAlbumFromPost };
