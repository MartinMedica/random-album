import ReactHtmlParser from 'react-html-parser';
import { graphql } from "gatsby"
import * as React from "react"
import { useState, useEffect } from "react"
import { searchArticle, getArticle } from "../services/wikipedia"

const getRandomAlbum = (albums) => {
  let rand = Math.floor(Math.random()*albums.length)
  return albums[rand]
}

const IndexPage = ({data}) => {
  const  {childrenAlbumsCsv: albums } = data.file;
  const [album, setAlbum] = useState(getRandomAlbum(albums));
  const [wiki, setWiki] = useState('');
  const [link, setLink] = useState('');

  // album.title.replace(/\-/g, '').replace(/\s+/g, '_')
  useEffect(() => {
    setWiki('');
    searchArticle(`${album.artist} ${album.title}`, 
      (err, data)=>{
        if(!err &&  data.query.search[0]){
          console.log(data);
          setLink(`https://en.wikipedia.org/wiki/${data.query.search[0].title}`)
          getArticle(data.query.search[0].title, 
            (err, data)=>{
              if(!err){
                let page = data.query.pages;
                let pageId = Object.keys(page)[0];
                console.log(pageId);
                let content = page[pageId].extract;
                setWiki(content);
              }
            });
        }
      });
  }, [album])

  return (
    <>
     <h1>{album.artist} - {album.title}</h1>
     <button onClick={(e) => {
        e.preventDefault();
        setAlbum(getRandomAlbum(albums))
      }}>Get Random  Album</button>
      <p>Extract obtained from wikipedia: <a href={link}  rel="noopener noreferrer" target="_blank">go to original article</a></p>
      <div>
        {ReactHtmlParser(wiki)}
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
query albums {
  file{
    childrenAlbumsCsv{
      id
      artist
      title
      info
      tags
    }
  }
}
`
