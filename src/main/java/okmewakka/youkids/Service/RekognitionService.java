// package okmewakka.youkids.Service;

// import com.amazonaws.auth.AWSStaticCredentialsProvider;
// import com.amazonaws.auth.BasicAWSCredentials;
// import com.amazonaws.services.rekognition.AmazonRekognition;
// import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
// import com.amazonaws.services.rekognition.model.*;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.nio.ByteBuffer;
// import java.io.IOException;

// @Service
// public class RekognitionService {

//     private final AmazonRekognition rekognitionClient;

//     public RekognitionService() {
//         BasicAWSCredentials awsCreds = new BasicAWSCredentials("AKIAXXNNTXWNKASLG6HO", "r1J71kOI2lInLD5UW6mmaUfzITNRhDwsONjUo3xf");
//         this.rekognitionClient = AmazonRekognitionClientBuilder.standard()
//                 .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
//                 .withRegion("ap-northeast-2")
//                 .build();
//     }

//     public DetectFacesResult detectFaces(MultipartFile file) throws IOException {
//         ByteBuffer imageBytes = ByteBuffer.wrap(file.getBytes());
//         Image image = new Image().withBytes(imageBytes);

//         DetectFacesRequest request = new DetectFacesRequest().withImage(image).withAttributes(Attribute.ALL);
//         return rekognitionClient.detectFaces(request);
//     }

//     public CompareFacesResult compareFaces(ByteBuffer sourceImageBytes, ByteBuffer targetImageBytes) {
//         Image sourceImage = new Image().withBytes(sourceImageBytes);
//         Image targetImage = new Image().withBytes(targetImageBytes);

//         CompareFacesRequest request = new CompareFacesRequest()
//                 .withSourceImage(sourceImage)
//                 .withTargetImage(targetImage)
//                 .withSimilarityThreshold(80F);

//         return rekognitionClient.compareFaces(request);
//     }
// }
