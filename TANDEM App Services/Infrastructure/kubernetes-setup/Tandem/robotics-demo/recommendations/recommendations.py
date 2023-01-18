from concurrent import futures
import random

import grpc

import logging

from recommendations_pb2 import (
    BookCategory,
    BookRecommendation,
    RecommendationResponse,
)

import recommendations_pb2_grpc

books_by_category = {
    BookCategory.MYSTERY: [
        BookRecommendation(id=1, title="The Maltese Falcon"),
        BookRecommendation(id=2, title="Murder on the Orient Express"),
        BookRecommendation(id=3, title="The Hound of the Baskervilles"),
    ],
}

class RecommendationService(
        recommendations_pb2_grpc.RecommendationsServicer
):
    def Recommend(self, request, context):
        if request.category not in books_by_category:
            context.abort(grpc.StatusCode.NOT_FOUND, "Category Not Found !")

        books_for_category = books_by_category[request.category]
        num_results = min(request.max_results, len(books_for_category))
        books_to_recommend = random.sample(books_for_category, num_results)

        return RecommendationResponse(recommendations=books_to_recommend)

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  recommendations_pb2_grpc.add_RecommendationsServicer_to_server( RecommendationService(), server )

  server.add_insecure_port("[::]:50051")

  print( "Ready to Start Recommendations Server !" )
  server.start()

  server.wait_for_termination()

# This is MAIN function for recommendations
if __name__ == "__main__":
    logging.basicConfig()
    serve()
