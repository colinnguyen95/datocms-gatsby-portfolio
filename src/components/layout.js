import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from "gatsby-image"
import BackgroundImage from 'gatsby-background-image'
import BurgerMenu from "../components/BurgerMenu/BurgerMenu"
import Contact from "../components/Contact/Contact"
import useTheme from './useTheme';
import ToggleMode from './ToggleMode'
import '../styles/index.sass'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import style from 'styled-theming';
// const imageData = data.img1.childImageSharp.fluid
// const profPic = data.profilepic.childImageSharp.fluid
// const [theme, setTheme ] = useState({ mode: 'light' });

const getBackground = style('mode', {
  light: '#EEE',
  dark: '#212C4F'
});

const getForeground = style('mode', {
  light: '#111',
  dark: '#EEE'
});

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${getBackground};
  color: ${getForeground};
}
`;

const Layout = ({ children, data }) => {
  const theme = useTheme();
  const imageData = data.img1.childImageSharp.fluid
  const profPic = data.profilepic.childImageSharp.fluid
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
            fluid={imageData}
          >
            <div className="sidebar">
              <div className="sidebar__header">
                <BurgerMenu />
                <h6 className="sidebar__title">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </h6>
                
                <div>
                  <Img fluid = {profPic} className="profPic"/>
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
                    <Link to="/about">About</Link>
                  </li>
                </ul>
                <ToggleMode />
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
      img1: file(relativePath: {eq: "Figma.png"}) {
        childImageSharp{
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      profilepic: file(relativePath: {eq: "Colin_Editorial.jpg"}) {
        childImageSharp{
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
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

// TemplateWrapper.propTypes = {
//   children: PropTypes.object,
// }

// export default TemplateWrapper


// const TemplateWrapper = ({ children }) => (
//   <StaticQuery query={graphql`
//     query LayoutQuery
//     {
//       img1: file(relativePath: {eq: "Figma.png"}) {
//         childImageSharp{
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       profilepic: file(relativePath: {eq: "Colin_Editorial.jpg"}) {
//         childImageSharp{
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       datoCmsSite {
//         globalSeo {
//           siteName
//         }
//         faviconMetaTags {
//           ...GatsbyDatoCmsFaviconMetaTags
//         }
//       }
//       datoCmsHome {
//         seoMetaTags {
//           ...GatsbyDatoCmsSeoMetaTags
//         }
//         introTextNode {
//           childMarkdownRemark {
//             html
//           }
//         }
//         copyright
//       }
//       allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
//         edges {
//           node {
//             profileType
//             url
//           }
//         }
//       }
//     }
//   `}
//   render={data => {
//     // const [theme, setTheme ] = useState({ mode: 'light' });
//     const imageData = data.img1.childImageSharp.fluid
//     const profPic = data.profilepic.childImageSharp.fluid
//     return (
//     <div className="container">
//       <HelmetDatoCms
//         favicon={data.datoCmsSite.faviconMetaTags}
//         seo={data.datoCmsHome.seoMetaTags}
//       />
//       <BackgroundImage 
//         className="container__sidebar" 
//         fluid={imageData}
//       >
//         <div className="sidebar">
//           <div className="sidebar__header">
//             <BurgerMenu />
//             <h6 className="sidebar__title">
//               <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
//             </h6>
            
//             <div>
//               <Img fluid = {profPic} className="profPic"/>
//             </div>
//             <div
//               className="sidebar__intro"
//               dangerouslySetInnerHTML={{
//                 __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
//               }}
//             />
//             <ul className="sidebar__menu">
//               <li>
//                 <Link to="/">Projects</Link>
//               </li>
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//             </ul>
//           </div>
//           <div className="sidebar__footer">
//             <p className="sidebar__social">
//               {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
//                 <a
//                   key={profile.profileType}
//                   href={profile.url}
//                   target="blank"
//                   className={`social social--${profile.profileType.toLowerCase()}`}
//                 > </a>
//               ))}
//             </p>
//             <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
//           </div>
//         </div>
//       </BackgroundImage>
//       <div className="container__body">
//         {/* <div className="container__mobile-header">
//           <div className="mobile-header">
//             <div className="mobile-header__menu">
//               <Link to="#" data-js="toggleSidebar" />
//             </div>
//             <div className="mobile-header__logo">
//               <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
//             </div>
//           </div>
//         </div> */}
//         {children}
//         <Contact />
//       </div>
//     </div>
//     )
//     }
//     }
//   />
// )

// TemplateWrapper.propTypes = {
//   children: PropTypes.object,
// }

// export default TemplateWrapper
