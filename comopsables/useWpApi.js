/**
 * WordPress Composables
 * A collection of WordPress composable functions.
 */
import axios from 'axios';

export default () => {
  const fetchData = async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`https://blog.mockcertified.com/wp-json/wp/v2/${endpoint}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  const getPosts = async (page = 1, perPage = 100) => {
    try {
      const params = {
        page,
        per_page: perPage,
        _embed: true,
      };

      return fetchData('posts', params);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const getCategories = async () => {
    try {
      return fetchData('categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  const getCategoryBySlug = async (slug) => {
    try {
      return fetchData('categories', { slug });
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  };

  const getPostBySlug = async (slug) => {
    try {
      const params = {
        _embed: true, // Include _embed parameter in the request
      };
      return fetchData(`posts?slug=${slug}`, params); // Pass the slug as a query parameter
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  };

  return {
    getPosts,
    getCategories,
    getCategoryBySlug,
    getPostBySlug,
  };
};
