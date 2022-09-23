import "../styles/index.css"
import ReactHtmlParser from 'react-html-parser';
import { graphql } from "gatsby"
import * as React from "react"
import { useState, useEffect } from "react"
import { searchArticle, getArticle, getImage } from "../services/wikipedia"

const getRandomAlbum = (albums) => {
  let rand = Math.floor(Math.random()*albums.length)
  return albums[rand]
}

const IndexPage = ({data}) => {
  const albums = [ ...data.allAlbumsCsv.nodes, ...data.allJazzCsv.nodes];
  const [album, setAlbum] = useState(getRandomAlbum(albums));
  const [wiki, setWiki] = useState('');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setWiki('');
      setLink('');
      setThumbnail('');
      const title = await searchArticle(`${album.artist} ${album.title}`);
      setLink(`https://en.wikipedia.org/wiki/${title}`);

      const[wiki, image] = await Promise.all([getArticle(title), getImage(title)]);
      setWiki(wiki);
      setThumbnail(image);
    }
    fetchData();
  }, [album])

  return (
    <div className="root">
      <header className='header' >
        { thumbnail && <img  className='thumbnail' src={thumbnail} alt={album.title}></img> }
        <h1 className='title'>{album.artist} - {album.title}</h1>
        <button className='btnGetRandomAlbum' onClick={(e) => {
          e.preventDefault();
          setAlbum(getRandomAlbum(albums))
        }}>Get Random  Album</button>
        { link  && <p className='original' >Extract obtained from wikipedia: <a href={link}  rel="noopener noreferrer" target="_blank">go to original article</a></p> }
      </header>
      <div className='main'>
        {ReactHtmlParser(wiki)}
      </div>
    </div>
  )
}

export default IndexPage

export const query = graphql`
query albums {
  allJazzCsv {
    nodes {
      id
      artist
      title
      info
      tags
    }
  }
  allAlbumsCsv {
    nodes {
      id
      artist
      title
      info
      tags
    }
  }
}
`
