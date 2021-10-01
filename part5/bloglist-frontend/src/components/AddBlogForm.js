import React from 'react'

const AddBlogForm = ({ addBlog, title, setTitle,
    author, setAuthor, url, setUrl }) => {
    
    return (
        <div>
            <h3>Add a new blog</h3>
            <form onSubmit={addBlog}>
            <div className='container'>
                <label htmlFor='title'>Title:</label>
                <input
                    id='title' 
                    type="text" 
                    value={title} 
                    onChange={({ target }) => setTitle(target.value)}
                />
                <label htmlFor='author'>Author:</label>
                <input 
                    id='author'
                    type="text" 
                    value={author} 
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <label htmlFor='url'>Url:</label>
                <input 
                    id='url' 
                    type="text" 
                    value={url} 
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit" >Add</button>
            </form>
        </div>
    )
}

export default AddBlogForm