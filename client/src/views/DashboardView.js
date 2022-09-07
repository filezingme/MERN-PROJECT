import { postContext } from "../contexts/postContext"
import { useContext, useEffect } from "react"
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { authContext } from "../contexts/authContext"
import SinglePost from "../components/posts/SinglePost"

const DashboardView = () => {

  //Contexts
  const {authState: {user: {username}}} = useContext(authContext)

  const {
    postState: {posts, postsLoading},
    getPosts
  } = useContext(postContext)


  useEffect(() => {
    getPosts()
  }, [])


  let body = null

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  }
  else if (posts.length === 0) {
    body = (
      <Card className="text-center- mx-5 my-5">
        <Card.Header as='h1'>Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button variant="primary">LearnIt!</Button>
        </Card.Body>
      </Card>
    )
  }
  else {
    body = (
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
        {posts.map(post => (
          <Col key={post._id} className='my-2'>
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
    )
  }


  return (<>
    {body}
  </>)
}

export default DashboardView