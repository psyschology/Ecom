import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { Product, Order } from "@/types"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPB4XV-uPVA_LYlU2TyJ-Og9uBpZ_S7-c",
  authDomain: "ecom-39898.firebaseapp.com",
  projectId: "ecom-39898",
  storageBucket: "ecom-39898.firebasestorage.app",
  messagingSenderId: "872460109128",
  appId: "1:872460109128:web:412902c6e7e923cbee1f7d",
  measurementId: "G-CFRGKPTELJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Product functions
export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, orderBy("name"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Product,
    )
  } catch (error) {
    console.error("Error getting products:", error)
    // Return sample data for demo
    return [
      {
        id: "1",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 2999,
        originalPrice: 3999,
        category: "electronics",
        stock: 50,
        isOnSale: true,
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "2",
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 599,
        category: "clothing",
        stock: 100,
        isOnSale: false,
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "3",
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 8999,
        originalPrice: 12999,
        category: "electronics",
        stock: 25,
        isOnSale: true,
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "4",
        name: "Plant Pot Set",
        description: "Beautiful ceramic plant pots for your garden",
        price: 1299,
        category: "home",
        stock: 30,
        isOnSale: false,
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ]
  }
}

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Product
    }
    return null
  } catch (error) {
    console.error("Error getting product:", error)
    // Return sample data for demo
    const products = await getProducts()
    return products.find((p) => p.id === id) || null
  }
}

export const addProduct = async (productData: Omit<Product, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData)
    return docRef.id
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  try {
    const docRef = doc(db, "products", id)
    await updateDoc(docRef, productData)
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id))
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// Order functions
export const getOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Order,
    )
  } catch (error) {
    console.error("Error getting orders:", error)
    return []
  }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const docRef = doc(db, "orders", orderId)
    await updateDoc(docRef, { status })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

// Storage functions
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}
