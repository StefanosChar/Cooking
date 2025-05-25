import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";

const RecipesDetails = ({ auth }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeLoading, setLikeLoading] = useState({});
  const [myCommentCount, setMyCommentCount] = useState(0);

  useEffect(() => {
  axios.get('http://localhost:3001/my-comment-count', { withCredentials: true })
    .then(res => setMyCommentCount(res.data.comment_count))
    .catch(() => setMyCommentCount(0));
}, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/${id}/comments`,
        { withCredentials: true }
      );
      setComments(response.data);
    } catch (error) {
      setComments([]);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://localhost:3001/recipes/${id}/comments`,
        { comment_text: newComment },
        { withCredentials: true }
      );
      setNewComment('');
      fetchComments();
    } catch (error) {
      alert('Αποτυχία υποβολής σχολίου');
    }
  };

  const handleLike = async (commentId, likedByMe) => {
    if (!auth?.authenticated) return;
    
    setLikeLoading(prev => ({ ...prev, [commentId]: true }));
    
    try {
      if (likedByMe) {
        await axios.post(
          `http://localhost:3001/comments/${commentId}/unlike`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `http://localhost:3001/comments/${commentId}/like`,
          {},
          { withCredentials: true }
        );
      }
      fetchComments();
    } catch (error) {
      alert('Σφάλμα κατά την ενημέρωση του like');
    } finally {
      setLikeLoading(prev => ({ ...prev, [commentId]: false }));
    }
  };

  if (!recipe) {
    return (
      <div className="bg-light min-vh-100">
        <NavBar auth={auth} />
        <div className="container py-5 text-center">
          <h2>Η συνταγή δεν βρέθηκε.</h2>
          <Link to="/recipes" className="btn btn-primary mt-3">Επιστροφή στις Συνταγές</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="card-img-top"
                style={{ maxHeight: 350, objectFit: 'cover' }}
              />
              <div className="card-body">
                {/* --- ΕΔΩ ΠΡΟΣΤΕΘΗΚΕ Η ΕΜΦΑΝΙΣΗ ΤΩΝ ΣΤΟΙΧΕΙΩΝ ΤΗΣ ΣΥΝΤΑΓΗΣ --- */}
                <div className="d-flex align-items-center mb-3">
                  <h1 className="card-title mb-0 flex-grow-1 fw-bold">{recipe.title}</h1>
                  <span className="badge bg-warning text-dark ms-2 fs-6">
                    <i className="bi bi-star-fill"></i> {recipe.rating}
                  </span>
                </div>
                <div className="mb-2 text-muted">
                  <span className="me-3"><i className="bi bi-clock"></i> {recipe.prep_time} λεπτά</span>
                  <span className="me-3"><i className="bi bi-bar-chart"></i> {recipe.difficulty}</span>
                  {recipe.categories && recipe.categories.map(tag => (
                    <span key={tag} className="badge bg-light text-dark border ms-1">{tag}</span>
                  ))}
                </div>
                <p className="lead mt-3">{recipe.description}</p>
                <hr />
                <h5 className="fw-bold">Υλικά</h5>
                <ul className="mb-4">
                  {recipe.ingredients && recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <h5 className="fw-bold">Οδηγίες Εκτέλεσης</h5>
                <ol>
                  {recipe.instructions && recipe.instructions.map((step, idx) => (
                    <li key={idx} className="mb-2">{step}</li>
                  ))}
                </ol>
                {/* --- ΤΕΛΟΣ ΠΡΟΣΘΗΚΗΣ --- */}

                {/* Σύστημα Σχολίων */}
                <div className="mt-5">
                  <h4 className="mb-4 border-bottom pb-2">Σχόλια ({comments.length})</h4>
                  
                  {auth && auth.authenticated && (
                    <div className="mb-4">
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Γράψτε το σχόλιό σας..."
                      />
                      <button 
                        className="btn btn-primary"
                        onClick={handleCommentSubmit}
                      >
                        Υποβολή Σχολίου
                      </button>
                    </div>
                  )}

                  <div className="comments-list">
                    {comments.map(comment => (
                      <div key={comment.comment_id} className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="card-subtitle text-muted">{comment.username}{auth?.user?.id === comment.user_id && myCommentCount > 10 && 
                            (<FaStar color="#FFD700" title="Έχεις πάνω από 10 σχόλια!" style={{ marginLeft: 6 }} />)}</h6>
                            <small className="text-muted">
                              {new Date(comment.created_at).toLocaleDateString('el-GR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </small>
                          </div>
                          <p className="card-text">{comment.comment_text}</p>
                          <div className="mt-2">
                            <button
                              className={`btn btn-sm ${comment.likedByMe ? 'btn-success' : 'btn-outline-success'}`}
                              onClick={() => handleLike(comment.comment_id, comment.likedByMe)}
                              disabled={likeLoading[comment.comment_id]}
                            >
                              👍 {comment.likes}
                              {likeLoading[comment.comment_id] && (
                                <div className="spinner-border spinner-border-sm ms-2" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/recipes" className="btn btn-outline-primary mt-4">
                  &larr; Επιστροφή στις Συνταγές
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesDetails;
