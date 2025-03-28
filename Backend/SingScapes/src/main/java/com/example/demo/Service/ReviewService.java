package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Review;
import com.example.demo.Repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Method to create a new review
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    // Method to get all reviews for a specific attraction
    public List<Review> getReviewsByAttractionId(UUID attractionId) {
        return reviewRepository.findAllByAttraction_Id(attractionId);
    }

    // Method to get a specific review by its ID
    public Optional<Review> getReviewById(UUID reviewId) {
        return reviewRepository.findById(reviewId);
    }

    // Method to update a review
    public Optional<Review> updateReview(UUID reviewId, Review updatedReview) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Review existingReview = reviewOptional.get();
            existingReview.setText(updatedReview.getText());
            existingReview.setFlagged(updatedReview.isFlagged());
            // Add any other fields you want to update

            return Optional.of(reviewRepository.save(existingReview));
        }
        return Optional.empty();
    }

    // Method to delete a review
    public boolean deleteReview(UUID reviewId) {
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
            return true;
        }
        return false;
    }

    // Method to flag a review as inappropriate
    public Optional<Review> flagReview(UUID reviewId) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();
            review.setFlagged(true);
            return Optional.of(reviewRepository.save(review));
        }
        return Optional.empty();
    }
}
