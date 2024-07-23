import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema(
  {
    id: Object,
    title: String,
    postId: Number,
    subtitle: String,
    metaTitle: String,
    metaDescription: String,
    category: String,
    permaLink: String,
    enable: Boolean,
    trash: Boolean,
    featuredImg: Object,
    _createdAt: String,
    _updatedAt: String,
    contentHTML: String,
    faq: Array,
  },
  {
    versionKey: false, // Isso impede que o campo "__v" seja incluído nos documentos
  },
)

export const Posts =
  mongoose?.models?.posts || mongoose?.model('posts', postsSchema)
