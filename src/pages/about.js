import React from "react"
import styles from "./about.module.css"
import Layout from "../components/layout"

const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

export default function About() {
  return (
    <Layout>
      <h1>About me</h1>
      <User
        username="Haraman Johal"
        avatar="/profilepicture.jpg"
        excerpt="I'm Haraman a 26 year old data scientist living in Oxford, UK."
      />
    </Layout>
  )
}