import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // Contexts
  const {
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    setShowToast
  } = useContext(PostContext);

  // // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "Pending",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddPostData()
    setShowAddPostModal(false);
  };

  const onSubmit = async event => {
  	// event.preventDefault()
  	const { success, message } = await addPost(newPost)
  	resetAddPostData()
    setShowAddPostModal(false)
  	setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }

  const resetAddPostData = () => {
  	setNewPost({ title: '', description: '', url: '', status: 'Pending' })
  	setShowAddPostModal(false)
  }

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Write Activities you want to work</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              aria-describedby="title-help"
			  value={title}
			  onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
			 <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
			  value={description}
			  onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Youtube" name="url" value={url}
			  onChange={onChangeNewPostForm}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Let's Start!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
