import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL

  return (
    <div>
      <h2>Blog Post {id}</h2>
      <p>Content for blog post {id}...</p>
    </div>
  );
};