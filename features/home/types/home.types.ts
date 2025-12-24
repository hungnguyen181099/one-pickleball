export type HomeProfileResponse = {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role_type: string;
    status: string;
    elo_rating: number;
    elo_rank: string;
    total_ocr_matches: number;
    ocr_wins: number;
    ocr_losses: number;
    challenge_score: string;
    community_score: string;
    total_oprs: string;
    opr_level: string;
    created_at: string;
    updated_at: string;
  };
};
