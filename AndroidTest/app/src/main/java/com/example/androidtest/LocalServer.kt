import android.content.Context
import io.ktor.http.*
import io.ktor.server.application.call
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.routing

class LocalServer(private val context: Context) {
    private val server = embeddedServer(Netty, port = 3000) {
        routing {
            get("/") {
                val htmlContent = context.assets.open("index.html").bufferedReader().use { it.readText() }
                call.respondText(htmlContent, ContentType.Text.Html)
            }
        }
    }

    fun start() {
        server.start(wait = false)
    }

    fun stop() {
        server.stop(1000, 10000)
    }
}