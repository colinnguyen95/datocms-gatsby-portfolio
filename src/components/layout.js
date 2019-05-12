import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"
import BurgerMenu from "../components/BurgerMenu/BurgerMenu"
import Contact from "../components/Contact/Contact"
import useTheme from './useTheme';
import ToggleMode from './ToggleMode'
import '../styles/index.sass'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import style from 'styled-theming';
import './misc.css'

const getBackground = style('mode', {
  light: '#EEE',
  dark: '#212C4F'
});

const getCaption = style('mode', {
  light: '#EFF3F5',
  dark: '#0A0F2D'
});

const getContact = style('mode', {
  light: 'rgb(122, 65, 246)',
  dark: '#EEE'
});

const getForeground = style('mode', {
  light: 'rgba(0,0,0,.84)',
  dark: '#EEE'
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${getBackground};
    color: ${getForeground};
  }

  a[href^="tel"] {
      color: ${getContact};
      text-decoration: none; /* Remove underline. */
  }

  .card__caption, .card__caption a{
    background-color: ${getCaption};
    color: ${getForeground};
  }

  .slick-border{
    border: 5px solid ${getBackground};
  }

  .ContactGroup{
    color: ${getContact};
  }

  .project__header{
    color: ${getContact};
  }
`;

const Layout = ({ children, data }) => {
  const theme = useTheme();
  const lightImg = data.datoCmsHome.lightMode.fluid
  const darkImg = data.datoCmsHome.darkMode.fluid
  let themeImg = theme.mode === 'light' ? lightImg : darkImg
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="container">
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <BackgroundImage
            className="container__sidebar"
            fluid={ themeImg }
          >
          {/* {
            theme.mode === 'light' 
            ? <Img
                fluid={lightImg}
                className="container__sidebar"
                style={{
                  position: "absolute",
                  zIndex: -99
                }}
              /> 
            : <Img
                fluid={darkImg}
                className="container__sidebar"
                style={{
                  position: "absolute",
                  zIndex: -99
                }}
              />
          } */}
            <div className="sidebar">
              <div className="sidebar__header">
                <BurgerMenu />
                <div className="name__header">
                  <h6 className="sidebar__title">
                    <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                  </h6>
                  <ToggleMode />
                </div>
                <div>
                  <Img fluid={data.datoCmsHome.hero.fluid} className="profPic" />
                </div>
                <div
                  className="sidebar__intro"
                  dangerouslySetInnerHTML={{
                    __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
                  }}
                />
                <ul className="sidebar__menu">
                  <li>
                    <Link to="/">Projects</Link>
                  </li>
                  <li>
                    <a href={data.datoCmsHome.resume.url} target="_blank" rel="noopener noreferrer">Resume</a>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar__footer">
                <p className="sidebar__social">
                  {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                    <a
                      key={profile.profileType}
                      href={profile.url}
                      target="blank"
                      className={`social social--${profile.profileType.toLowerCase()}`}
                    > </a>
                  ))}
                </p>
                <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
              </div>
            </div>
          </BackgroundImage>
          <div className="container__body">
            {children}
            <Contact />
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}

export default props => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome { 
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        hero {
          fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        lightMode {
          fluid(maxWidth: 600, imgixParams: { fm: "png", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        darkMode {
          fluid(maxWidth: 600, imgixParams: { fm: "png", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        resume {
          url
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => <Layout data={data} {...props} />}
  />
)

