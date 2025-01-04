package com.example.androidtest

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import fi.iki.elonen.NanoHTTPD
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.io.IOException


class MainActivity : AppCompatActivity(){
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout);
        val webView: WebView = findViewById(R.id.webview);
        webView.webViewClient = WebViewClient();
        val webSettings: WebSettings = webView.settings;
        webSettings.javaScriptEnabled = true;
        webSettings.domStorageEnabled = true;
//        webSettings.setSupportZoom(false);
//        webSettings.setSupportMultipleWindows(false);

        try {

            waitForServerReady("http://localhost:3000") {
                webView.loadUrl("http://localhost:3000/")
            }
        }catch (e: Exception){
            e.printStackTrace()
        }
    }
    override fun onDestroy() {
        super.onDestroy()

        // Stop the server when the activity is destroyed
        server?.stop()
        println("Server stopped")
    }
    private fun waitForServerReady(url: String, onReady: (String) -> Unit) {
        CoroutineScope(Dispatchers.IO).launch {
            var isServerReady = false

            // Poll the server until it's ready
            while (!isServerReady) {
                try {
                    val connection = java.net.URL(url).openConnection()
                    connection.connectTimeout = 1000 // 1-second timeout
                    connection.connect()
                    isServerReady = true
                } catch (e: Exception) {
                    // Server not ready yet, retry
                    delay(500) // Wait for 500ms before retrying
                }
            }

            // Once ready, load the URL in the WebView on the main thread
            withContext(Dispatchers.Main) {
                onReady(url)
            }
        }
    }
}