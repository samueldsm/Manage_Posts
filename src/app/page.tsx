import { Card, CardBody, CardHeader } from "@nextui-org/card";

import PostsManage from "@/components/posts/posts_manage";

const HomePage = () => {
  return (
    <>
      <Card className="purple-dark text-foreground bg-background">
        <CardHeader>
          <h1 className="font-bold">Posts</h1>
        </CardHeader>
        <CardBody>
          <PostsManage />
        </CardBody>
      </Card>
    </>
  );
};

export default HomePage;
