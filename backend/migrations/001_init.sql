-- 001_init.sql
-- FARKETMEZ Database Schema
-- Run this on initial setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    phone VARCHAR(20),
    location JSONB,
    budget_min DECIMAL(10,2) DEFAULT 0,
    budget_max DECIMAL(10,2) DEFAULT 1000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Tags (vibe, cuisine, features)
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    name_tr VARCHAR(50),
    category VARCHAR(20) NOT NULL, -- vibe, cuisine, feature
    icon VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    weight INT DEFAULT 50, -- 0-100
    UNIQUE(user_id, tag_id)
);

-- Venues (cached from Google Places)
CREATE TABLE IF NOT EXISTS venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_place_id VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    category VARCHAR(50),
    price_level INT, -- 1-4
    rating DECIMAL(2,1),
    photos TEXT[],
    opening_hours JSONB,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_coords CHECK (lat BETWEEN -90 AND 90 AND lng BETWEEN -180 AND 180)
);

-- Venue tags (crowdsourced)
CREATE TABLE IF NOT EXISTS venue_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    positive_count INT DEFAULT 0,
    negative_count INT DEFAULT 0,
    confidence DECIMAL(3,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(venue_id, tag_id)
);

-- Groups
CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES users(id),
    name VARCHAR(100),
    invite_code VARCHAR(10) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_groups_invite ON groups(invite_code);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    is_guest BOOLEAN DEFAULT FALSE,
    quick_preferences JSONB,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

-- Group settings
CREATE TABLE IF NOT EXISTS group_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE UNIQUE,
    budget_limit DECIMAL(10,2),
    red_flags UUID[],
    radius_km INT DEFAULT 5,
    location_center JSONB
);

-- Game sessions
CREATE TABLE IF NOT EXISTS group_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    game_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'voting',
    winner_venue_id UUID REFERENCES venues(id),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- Session venues
CREATE TABLE IF NOT EXISTS session_venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES group_sessions(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venues(id),
    display_order INT,
    eliminated BOOLEAN DEFAULT FALSE,
    UNIQUE(session_id, venue_id)
);

-- Venue votes
CREATE TABLE IF NOT EXISTS venue_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES group_sessions(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venues(id),
    user_id UUID REFERENCES users(id),
    vote VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, venue_id, user_id)
);

-- User notes on venues
CREATE TABLE IF NOT EXISTS venue_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial tags
INSERT INTO tags (name, name_tr, category, icon) VALUES
    ('quiet', 'Sakin', 'vibe', '🤫'),
    ('loud', 'Canlı', 'vibe', '🔊'),
    ('romantic', 'Romantik', 'vibe', '❤️'),
    ('cozy', 'Sıcak', 'vibe', '🛋️'),
    ('trendy', 'Trendy', 'vibe', '✨'),
    ('casual', 'Rahat', 'vibe', '👕'),
    ('fancy', 'Şık', 'vibe', '👔'),
    ('turkish', 'Türk Mutfağı', 'cuisine', '🇹🇷'),
    ('italian', 'İtalyan', 'cuisine', '🇮🇹'),
    ('asian', 'Asya', 'cuisine', '🥢'),
    ('cafe', 'Kafe', 'cuisine', '☕'),
    ('bar', 'Bar', 'cuisine', '🍺'),
    ('fastfood', 'Fast Food', 'cuisine', '🍔'),
    ('wifi', 'WiFi', 'feature', '📶'),
    ('parking', 'Otopark', 'feature', '🅿️'),
    ('outdoor', 'Açık Alan', 'feature', '🌳'),
    ('pet_friendly', 'Evcil Hayvan', 'feature', '🐕'),
    ('live_music', 'Canlı Müzik', 'feature', '🎵')
ON CONFLICT (name) DO NOTHING;
