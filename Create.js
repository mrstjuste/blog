import { useState } from "react";
import { useHistory } from 'react-router-dom';
import typeBlogs from './typeBlogs';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Select an option');
  const [type, setType] = useState('select an option');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog added');
      setIsPending(false);
      history.push('/');
    }).catch((error) => {
      console.error('Error:', error);
      setIsPending(false);
    });
  }

  const authors = [
    "Select an option", "mario", "luigi", "peach", "yoshi", "toad", "bowser",
    "wario", "waluigi", "daisy", "rosalina", "toadette", "koopatroopa",
    "shyguy", "lakitu", "bowserjr", "birdo", "kingboo", "kamek", "monty",
    "hammerbro", "drybones", "boo", "pom", "boom"
  ];



  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Select a blog type">Select a blog type</option>
          {typeBlogs.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          {authors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}
 
export default Create;
