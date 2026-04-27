package redis

import (
	"context"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

var client *redis.Client

// Connect establishes a connection to Redis
func Connect(redisURL string) error {
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		return err
	}

	client = redis.NewClient(opt)

	// Test connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		return err
	}

	log.Println("✅ Redis connected successfully")
	return nil
}

// GetClient returns the Redis client
func GetClient() *redis.Client {
	return client
}

// Close closes the Redis connection
func Close() {
	if client != nil {
		client.Close()
		log.Println("Redis connection closed")
	}
}

// Set sets a key-value pair with expiration
func Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	return client.Set(ctx, key, value, expiration).Err()
}

// Get gets a value by key
func Get(ctx context.Context, key string) (string, error) {
	return client.Get(ctx, key).Result()
}

// Del deletes a key
func Del(ctx context.Context, keys ...string) error {
	return client.Del(ctx, keys...).Err()
}

// Publish publishes a message to a channel
func Publish(ctx context.Context, channel string, message interface{}) error {
	return client.Publish(ctx, channel, message).Err()
}

// Subscribe subscribes to channels
func Subscribe(ctx context.Context, channels ...string) *redis.PubSub {
	return client.Subscribe(ctx, channels...)
}
