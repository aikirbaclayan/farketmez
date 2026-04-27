package database

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

// Connect establishes a connection pool to PostgreSQL
func Connect(databaseURL string) error {
	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return err
	}

	// Configure pool
	config.MaxConns = 25
	config.MinConns = 5
	config.MaxConnLifetime = time.Hour
	config.MaxConnIdleTime = 30 * time.Minute

	// Create pool
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pool, err = pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return err
	}

	// Test connection
	if err := pool.Ping(ctx); err != nil {
		return err
	}

	log.Println("✅ Database connected successfully")
	return nil
}

// GetPool returns the database connection pool
func GetPool() *pgxpool.Pool {
	return pool
}

// Close closes the database connection pool
func Close() {
	if pool != nil {
		pool.Close()
		log.Println("Database connection closed")
	}
}

// QueryRow executes a query that returns a single row
func QueryRow(ctx context.Context, sql string, args ...interface{}) pgxpool.Row {
	return pool.QueryRow(ctx, sql, args...)
}

// Query executes a query that returns rows
func Query(ctx context.Context, sql string, args ...interface{}) (pgxpool.Rows, error) {
	return pool.Query(ctx, sql, args...)
}

// Exec executes a query that doesn't return rows
func Exec(ctx context.Context, sql string, args ...interface{}) error {
	_, err := pool.Exec(ctx, sql, args...)
	return err
}
