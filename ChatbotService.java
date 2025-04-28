import dev.langchain4j.data.embedding.EmbeddingStore;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.ChatLanguageModel;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatbotService {

    private final EmbeddingStore embeddingStore;
    private final ChatLanguageModel chatLanguageModel;

    public ChatbotService(EmbeddingStore embeddingStore, ChatLanguageModel chatLanguageModel) {
        this.embeddingStore = embeddingStore;
        this.chatLanguageModel = chatLanguageModel;
    }

    public String chat(String userMessage) {
        // Retrieve relevant documents based on user input
        List<String> context = embeddingStore.findRelevant(userMessage);
        
        // Build prompt using context
        String prompt = String.join("\n", context) + "\nUser: " + userMessage;
        
        // Get AI-generated response
        return chatLanguageModel.chat(prompt);
    }
}