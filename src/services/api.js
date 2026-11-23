/**
 * API Service for communicating with the Express.js backend.
 * Uses Vite dev server proxy (/api) by default, or an explicit env variable.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Helper to handle fetch responses and standardize error messages.
 */
async function handleResponse(response) {
  let data = null
  try {
    data = await response.json()
  } catch {
    // If response body is not JSON or empty
  }

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error ||
      `Permintaan gagal dengan status ${response.status} (${response.statusText})`
    throw new Error(errorMessage)
  }

  return data
}

/**
 * Fetch all products from Express backend.
 * @returns {Promise<Array<{ id: number, name: string, price: number, createdAt?: string, updatedAt?: string }>>}
 */
export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return await handleResponse(res)
  } catch (error) {
    // Provide user-friendly troubleshooting if network connection failed
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Tidak dapat terhubung ke server backend Express. Pastikan server aktif di port 3000.'
      )
    }
    throw error
  }
}

/**
 * Fetch single product detail by ID.
 * @param {number|string} id
 */
export async function getProductById(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      Accept: 'application/json',
    },
  })
  return handleResponse(res)
}

/**
 * Create a new product.
 * @param {{ name: string, price: number }} payload
 */
export async function createProduct({ name, price }) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, price }),
  })
  return handleResponse(res)
}

/**
 * Update an existing product by ID.
 * @param {number|string} id
 * @param {{ name: string, price: number }} payload
 */
export async function updateProduct(id, { name, price }) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ id: Number(id), name, price }),
  })
  return handleResponse(res)
}

/**
 * Delete a product by ID.
 * @param {number|string} id
 */
export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })
  return handleResponse(res)
}
