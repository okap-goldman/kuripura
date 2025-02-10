export type User = {
  user_id: number;
  user_name: string;
  email: string;
  profile_icon_url: string | null;
  profile_audio_url: string | null;
  shop_link_url: string | null;
  is_shop_link: boolean;
  introduction: string | null;
  created_at: string;
  updated_at: string;
};
