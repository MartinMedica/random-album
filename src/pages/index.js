import { graphql } from "gatsby"
import * as React from "react"
import { useState } from "react"

const getRandomAlbum = (albums) => {
  let rand = Math.floor(Math.random()*albums.length)
  return albums[rand]
}

const IndexPage = ({data}) => {
  const  {childrenAlbumsCsv: albums } = data.file;
  const [album, setAlbum] = useState(getRandomAlbum(albums))
  return (
    <>
     <p>{album.title}</p>
     <button onClick={(e) => {
        e.preventDefault();
        setAlbum(getRandomAlbum(albums))
      }}>Get Random  Album</button>
    </>
  )
}

export default IndexPage

export const query = graphql`
query albums {
  file{
    childrenAlbumsCsv{
      id
      title
      info
      tags
    }
  }
}
`
