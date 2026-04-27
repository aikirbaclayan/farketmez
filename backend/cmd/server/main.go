package main

import (
	"log"
	"net/http"
	"os"

	"github.com/elphisia/farketmez/internal/config"
	"github.com/elphisia/farketmez/internal/middleware"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Load configuration
	cfg := config.Load()

	// Create router
	r := chi.NewRouter()

	// Global middleware
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(chimiddleware.RequestID)
	r.Use(chimiddleware.RealIP)

	// CORS configuration
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.CORSOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health check endpoint
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok","service":"farketmez-api"}`))
	})

	// API routes
	r.Route("/api/v1", func(r chi.Router) {
		// Public routes
		r.Group(func(r chi.Router) {
			r.Post("/auth/register", handlePlaceholder)
			r.Post("/auth/login", handlePlaceholder)
			r.Post("/auth/refresh", handlePlaceholder)
		})

		// Protected routes
		r.Group(func(r chi.Router) {
			r.Use(middleware.AuthMiddleware(cfg.JWTSecret))

			// Users
			r.Get("/users/me", handlePlaceholder)
			r.Put("/users/me", handlePlaceholder)
			r.Get("/users/me/preferences", handlePlaceholder)
			r.Put("/users/me/preferences", handlePlaceholder)

			// Groups
			r.Post("/groups", handlePlaceholder)
			r.Get("/groups/{id}", handlePlaceholder)
			r.Post("/groups/{id}/join", handlePlaceholder)
			r.Delete("/groups/{id}", handlePlaceholder)

			// Venues
			r.Get("/venues/search", handlePlaceholder)
			r.Get("/venues/{id}", handlePlaceholder)
			r.Get("/venues/recommended", handlePlaceholder)

			// Sessions (Games)
			r.Post("/groups/{id}/sessions", handlePlaceholder)
			r.Get("/sessions/{id}", handlePlaceholder)
			r.Post("/sessions/{id}/vote", handlePlaceholder)

			// AI
			r.Post("/ai/chat", handlePlaceholder)
			r.Post("/ai/recommend", handlePlaceholder)
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 FARKETMEZ API starting on port %s", port)
	log.Printf("📍 Health check: http://localhost:%s/health", port)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}

// Placeholder handler for routes not yet implemented
func handlePlaceholder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotImplemented)
	w.Write([]byte(`{"success":false,"error":{"code":"NOT_IMPLEMENTED","message":"Bu endpoint henüz implement edilmedi"}}`))
}
