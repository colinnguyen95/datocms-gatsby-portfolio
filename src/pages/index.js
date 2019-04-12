import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import Contact from "../components/contact"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <Img fluid={work.coverImage.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
    <Contact />
      <section id="three">
        <h2>Get In Touch</h2>
        <p>Accumsan pellentesque commodo blandit enim arcu non at amet id arcu magna. Accumsan orci faucibus id eu lorem semper nunc nisi lorem vulputate lorem neque lorem ipsum dolor.</p>
        <div className="row">
            <div className="8u 12u$(small)">
                <form method="post" action="#">
                    <div className="row uniform 50%">
                        <div className="6u 12u$(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
                        <div className="6u 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
                        <div className="12u"><textarea name="message" id="message" placeholder="Message" rows="4"></textarea></div>
                    </div>
                </form>
                <ul className="actions">
                    <li><input type="submit" value="Send Message" /></li>
                </ul>
            </div>
            <div className="4u 12u$(small)">
                <ul className="labeled-icons">
                    <li>
                        <h3 className="icon fa-home"><span className="label">Address</span></h3>
                        1234 Somewhere Rd.<br />
                        Nashville, TN 00000<br />
                        United States
                    </li>
                    <li>
                        <h3 className="icon fa-mobile"><span className="label">Phone</span></h3>
                        000-000-0000
                    </li>
                    <li>
                        <h3 className="icon fa-envelope-o"><span className="label">Email</span></h3>
                        <a href="#">hello@untitled.tld</a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
