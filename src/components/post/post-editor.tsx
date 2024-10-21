import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Container, Stack } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiClient } from "@/api/client";
import { base64ToFile } from "@/utils/base64ToFile";
import { updatePost, createPost } from "@/services/post-service";
import { useAuthentication } from "@/context/auth-context";
import { useNotification } from "@/context/notification-context";

interface PostEditorProps {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  user_id: string;
}

const EditPostDeatails: React.FC<PostEditorProps> = ({ post }: any) => {
  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState<string>(post?.cover_image || "");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    content: "",
    coverImageUrl: "",
  });
  const { activeUserId } = useAuthentication();
  const { notify } = useNotification();

  const { mutate: updatePostMutate } = updatePost();
  const { mutate: createPostMutate } = createPost();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCoverImageUrl(post.cover_image);
    }
  }, [post]);

  const handleImagesInContent = async (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = Array.from(doc.querySelectorAll("img"));
    const uploadedImages: string[] = [];

    for (const img of images) {
      const base64Image = img.src;
      if (base64Image.startsWith("data:image/")) {
        const file = base64ToFile(base64Image, `image-${Date.now()}.png`);
        const formData = new FormData();
        formData.append("file", file);
        try {
          const imageResponse = await apiClient.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          uploadedImages.push(imageResponse.data.filename);
          img.src = imageResponse.data.filename; // Replace base64 with URL
        } catch (error: any) {
          console.error("Error uploading image:", error.response?.data || error);
        }
      }
    }
    return doc.body.innerHTML; // Return updated content with image URLs
  };

  const uploadCoverImage = async () => {
    if (coverImage) {
      const formData = new FormData();
      formData.append("file", coverImage);

      try {
        const imageResponse = await apiClient.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return imageResponse.data.filename;
      } catch (error: any) {
        console.error("Error uploading cover image:", error.response?.data || error);
      }
    }
    return coverImageUrl; // Return the existing cover image URL if no new image is uploaded
  };

  const onCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCoverImage(file || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({ title: "", content: "", coverImageUrl: "", subtitle: "" });

    const validate = () => {
      if (!title)
        setErrors((prevErrors) => ({ ...prevErrors, title: "Title is required" }));

      if (content.length < 12)
        setErrors((prevErrors) => ({ ...prevErrors, content: "Content is required" }));

      if (post?.id && !coverImageUrl)
        setErrors((prevErrors) => ({
          ...prevErrors,
          cover_image: "Cover image is required",
        }));

      if (!post?.id && !coverImage)
        setErrors((prevErrors) => ({
          ...prevErrors,
          cover_image: "Cover image is required",
        }));

      if (!subtitle)
        setErrors((prevErrors) => ({
          ...prevErrors,
          subtitle: "Subtitle is required",
        }));

      return title && content && (coverImageUrl || coverImage) && subtitle;
    };

    if (!validate()) return notify("Please fill in all required fields", "error");

    const updatedContent = await handleImagesInContent(content);
    const uploadedCoverImageUrl = await uploadCoverImage();

    // try {
    //   if (post?.id) {
    //     updatePostMutate({
    //       id: post.id,
    //       payload: {
    //         title,
    //         subtitle,
    //         content: updatedContent,
    //         cover_image: uploadedCoverImageUrl,
    //       },
    //     });
    //   } else {
    //     createPostMutate({
    //       title,
    //       subtitle,
    //       content,
    //       user_id: activeUserId,
    //       cover_image: uploadedCoverImageUrl,
    //     });
    //   }
    // } catch (error) {
    //   notify("Error saving post:", "error");
    // }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component={"h1"} my="20px">
        {post ? "Edit Post" : "Create a New Post"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <span>{errors.title}</span>
        <TextField
          fullWidth
          label="Subtitle"
          variant="outlined"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <span>{errors.subtitle}</span>
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
          }}>
          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write something..."
              theme="snow"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>
        </Box>
        <span>{errors.content}</span>

        <Stack sx={{ marginTop: 8 }} direction="row" spacing={1}>
          <Button variant="contained" component="label" color="accent">
            Choose Cover Image*
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onCoverImageChange}
            />
          </Button>
          <span>{errors.coverImageUrl}</span>
          <Button type="submit" variant="contained" color="primary">
            {post ? "Update" : "Publish"}
          </Button>
        </Stack>
      </Box>
      {coverImage && (
        <Typography variant="body2">Cover image uploaded: {coverImage.name}</Typography>
      )}
    </Container>
  );
};

export default EditPostDeatails;
