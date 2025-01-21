import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Navbar } from "~/components/Navbar";
import { Button } from "~/components/ui/button";
import { Post } from "~/components/Post";

const SAMPLE_POSTS = [
  {
    author: {
      name: "Shota | 宇宙くん",
      image: "https://cdn.peraichi.com/userData/5e92b452-dcb8-4abc-a728-72d20a0000fe/img/660caeff26c50/original.jpg",
      id: "@uchu_kun__shota"
    },
    content: `僕の朝のルーティーン
    
朝起きて、まずは自分の部屋にご挨拶します✨

部屋を神殿として扱っているので♪

家はもちろんですが、特に自分の部屋のエネルギーは、自分の心の深いところと繋がってるので、扱い方を丁寧にするのがお勧めです🏠

部屋の状態と、心の裏側はとても似た姿をしています❤️`,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "Kanako | スピリチュアルヒーラー",
      image: "https://kuripura.s3.us-east-1.amazonaws.com/Kanako.jpg",
      id: "@nkmrknk694"
    },
    content: "https://kuripura.s3.us-east-1.amazonaws.com/image.jpg",
    caption: `🃏11月のカードリーディング🃏

各々のなかの正義がはっきりさせる。
自分はどうしたいのか、
どう生きてどう在りたいのか。
私の中の大切なものってなんだっけ？
そこがハッキリしてないと
この先どうしたらいいのかが分からなくなりやすい。
誰かが決めてくれることじゃない。
慈愛を自分自身に向け、
内に秘めたものととことん向き合う時期。

（中略）

ちょっとというか、やっぱりというか
強め厳しめのメッセージだったかな🫨

私もより一層、誠実に丁寧に
自分と一致して生きていくこと、
その行動をためらわないこと徹底していきます⭐️`,
    mediaType: "image" as const,
  },
  {
    author: {
      name: "かずぴー⭐︎ 【泉谷 和久】",
      image: "https://kuripura.s3.us-east-1.amazonaws.com/kazup.jpg",
      id: "@kazu993_ascensionlife"
    },
    content: `11/22は婚姻のみの予定でしたが、
なんと風の時代学校の仲間達がサプライズセレモニーを開いてくださりました😭✨

誰かのこと本当の家族みたいだって思うようになるなんて、
半年前には考えたこともなかったです。
青梅に来て生まれ変わったなぁ。。

（中略）

いつも命を使って僕と関わってくださり、ありがとうございます。`,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "Shota | 宇宙くん",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      id: "@uchu_kun__shota"
    },
    content: "https://mcdn.podbean.com/mf/web/ph7adzrxywrxv7it/bbygr.m4a",
    caption: "ただバスケを見た話。笑",
    mediaType: "audio" as const,
  },
  {
    author: {
      name: "内なる光",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      id: "@inner_light"
    },
    content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "この動画から多くの気づきを得ました。皆さんにもシェアしたいと思います。",
    mediaType: "video" as const,
  },
];

export default function IndexRoute() {
  const [timelineType, setTimelineType] = useState<"family" | "watch">("family");
  const [showWatchConfirm, setShowWatchConfirm] = useState(false);

  const handleTimelineChange = (type: "family" | "watch") => {
    if (type === "watch") {
      setShowWatchConfirm(true);
    } else {
      setTimelineType(type);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={timelineType === "family" ? "default" : "outline"}
            onClick={() => handleTimelineChange("family")}
          >
            ファミリー
          </Button>
          <Button
            variant={timelineType === "watch" ? "default" : "outline"}
            onClick={() => handleTimelineChange("watch")}
          >
            ウォッチ
          </Button>
        </div>

        <div className="space-y-4 max-w-xl mx-auto">
          {SAMPLE_POSTS.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </main>

      <AlertDialog open={showWatchConfirm} onOpenChange={setShowWatchConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ウォッチタイムラインの表示</AlertDialogTitle>
            <AlertDialogDescription>
              ウォッチタイムラインを表示しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setTimelineType("watch");
                setShowWatchConfirm(false);
              }}
            >
              表示する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}