import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({
        heading: '',
        para: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh
        try {
            const response = await axios.post('http://localhost:5000/api/ideas', formData);
            console.log('Data submitted:', response.data);
            // Optionally reset the form
            setFormData({
                heading: '',
                para: '',
                image: ''
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <h1>Submit Your Idea</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    value={formData.heading}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="para"
                    placeholder="Description"
                    value={formData.para}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
