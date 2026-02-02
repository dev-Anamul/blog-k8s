import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Landing } from "@/pages/Landing";
import { BlogList } from "@/pages/BlogList";
import { BlogDetail } from "@/pages/BlogDetail";
import { CreateBlog } from "@/pages/CreateBlog";
import { EditBlog } from "@/pages/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="edit/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
