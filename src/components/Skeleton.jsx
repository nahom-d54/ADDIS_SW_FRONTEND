import ContentLoader from 'react-content-loader'


const Skeleton = props => (
  <ContentLoader
    width="100%"
    height={550}
    viewBox="0 0 100% 550"
    backgroundColor="#777"
    foregroundColor="#ffffff"
    style={{ margin: '0 auto'}}
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="48" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="88" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="128" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="168" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="208" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="248" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="288" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="328" rx="3" ry="3" width="80%" height="30" />
    <rect x="48" y="368" rx="3" ry="3" width="80%" height="30" />
     
  </ContentLoader>
)

export default Skeleton